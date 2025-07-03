// export default {
// //   name: 'template',
// //   title: 'Resume Template',
// //   type: 'document',
// //   fields: [
// //     {
// //       name: 'title',
// //       title: 'Template Name',
// //       type: 'string',
// //       validation: Rule => Rule.required()
// //     },
// //     {
//       name: 'slug',
//       title: 'Slug',
//       type: 'slug',
//       options: {
//         source: 'title',
//         maxLength: 96,
//       },
//       validation: Rule => Rule.required()
//     },
//     {
//       name: 'category',
//       title: 'Category',
//       type: 'string',
//       options: {
//         list: [
//           {title: 'Creative', value: 'creative'},
//           {title: 'Professional', value: 'professional'},
//           {title: 'Modern', value: 'modern'},
//           {title: 'Minimalist', value: 'minimalist'},
//         ],
//       },
//       validation: Rule => Rule.required()
//     },
//     {
//       name: 'description',
//       title: 'Description',
//       type: 'text',
//       rows: 3,
//       validation: Rule => Rule.required().max(200)
//     },
//     {
//       name: 'mainImage',
//       title: 'Main Image',
//       type: 'image',
//       options: {
//         hotspot: true,
//       },
//       fields: [
//         {
//           name: 'alt',
//           type: 'string',
//           title: 'Alternative Text',
//         }
//       ],
//       validation: Rule => Rule.required()
//     },
//     {
//       name: 'canvaLink',
//       title: 'Canva Template Link',
//       type: 'url',
//       validation: Rule => Rule.required().uri({
//         scheme: ['https']
//       })
//     },
//   ],
//   preview: {
//     select: {
//       title: 'title',
//       media: 'mainImage',
//       category: 'category'
//     },
//     prepare(selection) {
//       const {title, media, category} = selection
//       return {
//         title,
//         media,
//         subtitle: category
//       }
//     }
//   }
// }


export default {
  name: 'template',
  title: 'Resume Template',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Template Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Creative', value: 'creative'},
          {title: 'Professional', value: 'professional'},
          {title: 'Modern', value: 'modern'},
          {title: 'Minimalist', value: 'minimalist'},
        ],
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200)
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating from 0 to 5 (in increments of 0.5)',
      options: {
        list: [
          { value: 0.5, title: '0.5' },
          { value: 1, title: '1' },
          { value: 1.5, title: '1.5' },
          { value: 2, title: '2' },
          { value: 2.5, title: '2.5' },
          { value: 3, title: '3' },
          { value: 3.5, title: '3.5' },
          { value: 4, title: '4' },
          { value: 4.5, title: '4.5' },
          { value: 5, title: '5' },
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required().min(0).max(5)
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'canvaLink',
      title: 'Canva Template Link',
      type: 'url',
      validation: Rule => Rule.required().uri({
        scheme: ['https']
      })
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      category: 'category',
      rating: 'rating'
    },
    prepare(selection) {
      const {title, media, category, rating} = selection
      return {
        title,
        media,
        subtitle: `${category} (Rating: ${rating})`
      }
    }
  }
}
