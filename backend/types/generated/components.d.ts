import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_blocks_testimonials';
  info: {
    displayName: 'Testimonial';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    date: Schema.Attribute.Date & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    isFeatured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    role: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsHeading extends Struct.ComponentSchema {
  collectionName: 'components_elements_headings';
  info: {
    displayName: 'Heading';
  };
  attributes: {
    tag: Schema.Attribute.Enumeration<['h1', 'h2', 'h3', 'h4', 'h5', 'h6']> &
      Schema.Attribute.Required;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionTestimonialSection extends Struct.ComponentSchema {
  collectionName: 'components_section_testimonial_sections';
  info: {
    displayName: 'Testimonial Section';
  };
  attributes: {
    heading: Schema.Attribute.Component<'elements.heading', false> &
      Schema.Attribute.Required;
    testimonials: Schema.Attribute.Component<'blocks.testimonial', true>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'blocks.testimonial': BlocksTestimonial;
      'elements.heading': ElementsHeading;
      'section.testimonial-section': SectionTestimonialSection;
    }
  }
}
