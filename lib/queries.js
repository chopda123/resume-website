// export const templatesQuery = `*[_type == "template"]{
//   _id,
//   title,
//   slug,
//   category,
//   description,
//   mainImage {
//     asset -> {
//       url
//     },
//     alt
//   },
//   canvaLink
// }`


export const templatesQuery = `*[_type == "template"]{
  _id,
  title,
  slug,
  category,
  description,
  rating,
  mainImage {
    asset -> {
      url
    },
    alt
  },
  canvaLink
}`;