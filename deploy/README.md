# Deploying to public_html

1. **Build** — from the project folder:

   ```sh
   pnpm install
   pnpm run build
   ```

   This writes the site to `build/`.

2. **Upload the site** — copy everything *inside* `build/` into `public_html`, so
   `index.html` sits directly in it. Include the hidden `.htaccess` file: in cPanel's
   File Manager turn on *Settings → Show Hidden Files*, and most FTP clients have a
   similar option.

3. **Upload the config** — copy `deploy/cause-config.php` into the folder *above*
   `public_html` (your cPanel home folder). It is ready as-is. Never put it inside
   `public_html`.

4. **Check PHP** — the waitlist needs PHP 8.1 or newer. In cPanel: *MultiPHP
   Manager*.

5. **Check email** — make sure `waitlist@causeafrica.co.za` exists as a mailbox or
   forwarder, and that *Email Deliverability* shows the domain as valid, or the
   notices may land in spam.

6. **Test** — sign up once on the live site. You should get the email, and
   `cause-waitlist.csv` will appear beside `cause-config.php`. Download that file
   any time for the full list.

Every later deploy repeats steps 1–2 only. The config and the signup list live
outside `public_html`, so re-uploading the site never touches them.

## Missing files

The privacy page links four PDFs that are not in the repo yet. Add them to
`static/documents/` with these names before building:

- `cause-privacy-policy.pdf`
- `cause-terms-of-service.pdf`
- `cause-paia-manual.pdf`
- `cause-payment-refund-policy.pdf`
