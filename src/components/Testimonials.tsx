import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export interface TestimonialData {
  heading: {
    tag: keyof React.JSX.IntrinsicElements;
    text: string;
  };
  testimonials: {
    name: string;
    role: string;
    image: string;
    rating: number;
    content: string;
    date: Date;
    isFeatured: boolean;
  }[];
}

const LocalCard = ({
  testimonial,
  size,
}: {
  testimonial: TestimonialData["testimonials"][0];
  size: string;
}) => {
  return (
    <Card
      className={`${size} overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg ${testimonial.isFeatured ? "border-yellow-400" : ""}`}
    >
      <CardContent className="p-4 h-full flex flex-col justify-between">
        <div>
          <p className="text-sm mb-2">{testimonial.content}</p>
          <div className="flex items-center mt-2">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(testimonial.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function TestimonialCard({ data }: Readonly<{ data: TestimonialData }>) {
  const Tag = data.heading.tag;
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Tag className="text-2xl font-bold text-center mb-8">
        {data.heading.text}
      </Tag>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 transition-opacity duration-300 ease-in-out opacity-100">
        {data.testimonials
          .toSorted((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
          .map((testimonial: TestimonialData["testimonials"][0], index: number) => (
            <LocalCard
              key={testimonial.name}
              testimonial={testimonial}
              size={index === 1 ? "row-span-1" : "row-span-1 md:row-span-2"}
            />
          ))}
      </div>
    </div>
  );
}
