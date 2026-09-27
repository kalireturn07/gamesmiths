import { FaDiscord, FaInstagram, FaWhatsapp } from 'react-icons/fa6'

/*
 * External links and the sign-up form. Everything marked TODO must be
 * filled in before launch. While a URL still contains "REPLACE_ME", the dev
 * server logs a warning in the browser console.
 */

export const SOCIAL_LINKS = [
  {
    id: 'discord',
    label: 'Discord',
    detail: 'Match schedules & jam chat',
    // TODO(launch): real Discord invite. Use a non-expiring invite link.
    href: 'https://discord.gg/REPLACE_ME',
    icon: FaDiscord,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    detail: 'Community announcements',
    // TODO(launch): real WhatsApp community / group invite link.
    href: 'https://chat.whatsapp.com/REPLACE_ME',
    icon: FaWhatsapp,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    // TODO(launch): real Instagram handle, in both `detail` and `href`.
    detail: '@REPLACE_ME',
    href: 'https://www.instagram.com/REPLACE_ME/',
    icon: FaInstagram,
  },
]

export const SIGNUP_FORM = {
  // How the "Join" form works. Pick one:
  //   'native'      – the built-in form; submissions are POSTed to `endpoint`.
  //                   Works with Formspree, Getform, Basin, or your own backend.
  //   'google-form' – embeds a Google Form instead (set `googleFormEmbedUrl`).
  provider: 'native',

  // TODO(launch): the form backend URL. With Formspree: create a form at
  // https://formspree.io, then paste its endpoint here (https://formspree.io/f/xxxxxxx).
  // The form sends multipart/form-data with `Accept: application/json` and
  // expects a 2xx response.
  endpoint: 'https://formspree.io/f/REPLACE_ME',

  // TODO(launch): only used when provider is 'google-form'. In Google Forms,
  // use Send → "<>" (embed), and copy the src URL (ends in ?embedded=true).
  googleFormEmbedUrl: 'https://docs.google.com/forms/d/e/REPLACE_ME/viewform?embedded=true',
}

export function isPlaceholder(url) {
  return !url || url.includes('REPLACE_ME')
}
