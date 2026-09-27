import { useId, useState } from 'react'
import { FaGamepad } from 'react-icons/fa6'
import { LuCircleAlert, LuLoaderCircle, LuSparkles } from 'react-icons/lu'
import { PILLARS, ROLES } from '../content/copy.js'
import { SIGNUP_FORM, isPlaceholder } from '../content/links.js'
import { cn } from '../lib/cn.js'

const inputBase =
  'mt-2 block w-full rounded-lg border-2 border-ink/20 bg-paper-light px-3.5 py-2.5 text-ink placeholder:text-muted transition-colors hover:border-ink/40 focus:border-red-bright focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red'

const YEARS = ['1st year', '2nd year', '3rd year', '4th year', 'M.Tech / MBA / MCA']

/**
 * Sign-up form. See SIGNUP_FORM in src/content/links.js to connect it to a
 * real backend (Formspree, Getform…) or to swap it for a Google Form embed.
 */
export default function SignupForm() {
  if (SIGNUP_FORM.provider === 'google-form') {
    return <GoogleFormEmbed />
  }
  return <NativeForm />
}

function GoogleFormEmbed() {
  if (isPlaceholder(SIGNUP_FORM.googleFormEmbedUrl)) {
    return (
      <p className="rounded-xl border-2 border-ink/15 bg-paper-light p-5 text-muted">
        The sign-up form is being set up. Until then, catch us on Discord or at the club desk.
      </p>
    )
  }
  return (
    <iframe
      src={SIGNUP_FORM.googleFormEmbedUrl}
      title="Gamesmiths sign-up form"
      loading="lazy"
      className="h-[900px] w-full rounded-xl bg-cream"
    >
      Loading…
    </iframe>
  )
}

function NativeForm() {
  const id = useId()
  const [status, setStatus] = useState('idle') // idle | sending | success | error | unconfigured

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget

    if (isPlaceholder(SIGNUP_FORM.endpoint)) {
      // TODO(launch): set SIGNUP_FORM.endpoint in src/content/links.js.
      console.warn('[Gamesmiths] Sign-up form endpoint is not configured. See src/content/links.js.')
      setStatus('unconfigured')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(SIGNUP_FORM.endpoint, {
        method: 'POST',
        body: toFormData(form),
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      form.reset()
      setStatus('success')
    } catch (error) {
      console.error('[Gamesmiths] Sign-up failed:', error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="note rotate-1 bg-note p-8 text-center">
        <LuSparkles aria-hidden="true" className="mx-auto text-4xl text-red-bright" />
        <p className="mt-4 font-marker text-3xl text-ink">Respawn point set.</p>
        <p className="mt-2 font-sans text-ink">
          You’re on the list. Join the Discord and WhatsApp community so you don’t miss the first session.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 font-sans text-sm font-semibold text-ink underline decoration-red-bright decoration-2 underline-offset-4 hover:text-red"
        >
          Sign up someone else
        </button>
      </div>
    )
  }

  const f = (name) => `${id}-${name}`

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-describedby={f('note')}>
      <p id={f('note')} className="text-sm text-muted">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={f('name')} label="Full name" required>
          <input id={f('name')} name="name" type="text" autoComplete="name" required className={inputBase} />
        </Field>
        <Field id={f('usn')} label="USN" required>
          <input
            id={f('usn')}
            name="usn"
            type="text"
            autoComplete="off"
            autoCapitalize="characters"
            placeholder="e.g. 2BA24CS001"
            required
            className={cn(inputBase, 'uppercase placeholder:normal-case')}
          />
        </Field>
        <Field id={f('email')} label="Email" required>
          <input id={f('email')} name="email" type="email" autoComplete="email" required className={inputBase} />
        </Field>
        <Field id={f('phone')} label="WhatsApp number" hint="Optional, for the community group">
          <input id={f('phone')} name="whatsapp" type="tel" autoComplete="tel" className={inputBase} />
        </Field>
        <Field id={f('branch')} label="Branch" required>
          <input
            id={f('branch')}
            name="branch"
            type="text"
            placeholder="e.g. CSE, ECE, Mech"
            required
            className={inputBase}
          />
        </Field>
        <Field id={f('year')} label="Year" required>
          <select id={f('year')} name="year" required defaultValue="" className={cn(inputBase, 'appearance-auto')}>
            <option value="" disabled>
              Choose one
            </option>
            {YEARS.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </Field>
      </div>

      <CheckboxGroup
        legend="Which tracks are you in for?"
        hint="Pick any. All three is a valid build."
        name="tracks"
        options={Object.values(PILLARS).map((p) => p.label)}
      />

      <CheckboxGroup
        legend="Interested in a lead role?"
        hint="Optional."
        name="roles"
        options={ROLES.roles.map((r) => r.title)}
      />

      <Field id={f('games')} label="Games you main / tools you use" hint="Optional">
        <input
          id={f('games')}
          name="games_or_tools"
          type="text"
          placeholder="Valorant, Godot, Krita…"
          className={inputBase}
        />
      </Field>

      <Field id={f('message')} label="Anything else?" hint="Optional: rank, portfolio link, favourite boss fight…">
        <textarea id={f('message')} name="message" rows={3} className={cn(inputBase, 'resize-y')} />
      </Field>

      {/* Spam trap: humans never see or fill this. Formspree drops submissions that include `_gotcha`. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Leave this empty
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === 'sending'} className="btn btn-red disabled:cursor-wait disabled:opacity-80">
          {status === 'sending' ? (
            <LuLoaderCircle aria-hidden="true" className="animate-spin text-[1.3em]" />
          ) : (
            <FaGamepad aria-hidden="true" className="text-[1.3em]" />
          )}
          {status === 'sending' ? 'Forging…' : 'Join the Forge'}
        </button>
        <p className="text-sm text-muted">We only use this to add you to the club roster.</p>
      </div>

      <div aria-live="polite">
        {(status === 'error' || status === 'unconfigured') && (
          <p className="flex gap-2 rounded-lg border-2 border-red-bright/60 bg-paper-light p-4 text-sm text-ink">
            <LuCircleAlert aria-hidden="true" className="mt-0.5 shrink-0 text-lg text-red-bright" />
            <span>
              {status === 'error'
                ? 'That didn’t go through (the server rage-quit). Try again in a moment, or ping us on Discord.'
                : 'Online sign-ups aren’t switched on yet. Until they are, join us on Discord or WhatsApp, or find us at the club desk.'}
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

/**
 * FormData with checkbox groups joined into one "a, b, c" value, so every
 * form backend (and every spreadsheet export) gets a single readable column.
 */
function toFormData(form) {
  const raw = new FormData(form)
  const data = new FormData()
  for (const key of new Set(raw.keys())) {
    data.append(key, raw.getAll(key).join(', '))
  }
  return data
}

function Field({ id, label, hint, required, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-red-bright">
            *
          </span>
        )}
        {hint && <span className="ml-2 font-normal text-muted">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

function CheckboxGroup({ legend, hint, name, options }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink">
        {legend}
        {hint && <span className="ml-2 font-normal text-muted">{hint}</span>}
      </legend>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-ink/20 bg-paper-light px-3.5 py-1.5 text-sm font-medium text-ink transition-colors hover:border-ink/40 has-checked:border-ink has-checked:bg-note has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-red"
          >
            <input type="checkbox" name={name} value={option} className="size-4 accent-red-bright focus:outline-none" />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
