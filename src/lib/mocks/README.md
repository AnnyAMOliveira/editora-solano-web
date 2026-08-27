# Mocks — TEMPORARY

Development fixtures only. Every file here is a stand-in for the CMS/API that
will feed the site later.

- The content is transcribed from the Figma Home frame, including the
  placeholder copy the design itself uses (agenda entries, blog posts and author
  names are `Evento Titulo`, `Titulo do Post`, `Nome do autor` in the design).
- Images are the mock assets exported from Figma into `public/assets/`.
- Nothing outside `src/lib/mocks/` may import these directly once the data layer
  exists: components receive data through props, and a mapping layer in
  `src/lib/` will convert CMS payloads into the types in `src/types/`.

Delete this directory when the CMS integration lands.
