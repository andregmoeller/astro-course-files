import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  singletons: {
    testimonial: singleton({
      label: "Testimonial Section",
      path: "src/content/keystatic/testimonialSection",
      format: { data: "yaml" },
      schema: {
        heading: fields.object({
          tag: fields.select({
            label: "HTML Tag",
            options: [
              {
                label: "h1",
                value: "h1",
              },
              {
                label: "h2",
                value: "h2",
              },
              {
                label: "h3",
                value: "h3",
              },
              {
                label: "h4",
                value: "h4",
              },
              {
                label: "h5",
                value: "h5",
              },
              {
                label: "h6",
                value: "h6",
              },
            ],
            defaultValue: "h1",
          }),
          text: fields.text({
            label: "Heading Text",
            validation: {
              isRequired: true,
            },
          }),
        }),
        testimonials: fields.array(
          fields.relationship({
            label: "Testimonials",
            collection: "testimonials",
          }),
          {
            label: "Testimonials",
            validation: { length: { min: 1 } },
            itemLabel: (props) => props.value ?? "Testimonial",
          }
        ),
      },
    }),
  },
  collections: {
    testimonials: collection({
      label: "Testimonials",
      path: "src/content/testimonial/*",
      format: { data: "yaml" },
      slugField: "name",
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        role: fields.text({
          label: "Role",
          validation: {
            isRequired: true,
          },
        }),
        content: fields.text({
          label: "Testimonial Content",
          validation: {
            isRequired: true,
          },
          multiline: true,
        }),
        date: fields.date({
          label: "Testimonial Date",
          defaultValue: { kind: "today" },
          validation: {
            isRequired: true,
          },
        }),
        isFeatured: fields.checkbox({
          label: "Feature this testimonial?",
          defaultValue: false,
        }),
        rating: fields.number({
          label: "Rating",
          defaultValue: 5,
          step: 1,
          validation: {
            isRequired: true,
            min: 1,
            max: 5,
          },
        }),
        image: fields.image({
          label: "Headshot",
          description: "Headshot for testimonial person",
          validation: {
            isRequired: true,
          },
          publicPath: "src/assets/testimonial/",
        }),
      },
    }),
  },
});
