import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../../data/metrics';
import { Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS_DATA[activeIndex];

  return (
    <section
      id="testimonials"
      aria-label="Scene 10 Testimonials and Trust"
      className="py-24 sm:py-32 border-b border-[#CFC5B8] bg-[#F5F0E8] relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#CFC5B8] pb-6 mb-16 gap-4">
          <div>
            <div className="font-mono text-xs text-[#B56A3A] tracking-wider mb-2 flex items-center gap-2">
              <span>SCENE 10</span>
              <span>//</span>
              <span>VERIFIED TRUST</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-sans text-[#24211D] tracking-tight">
              Client Feedback
            </h2>
          </div>
          <div className="font-mono text-xs text-[#81776C] max-w-xs text-left sm:text-right">
            UNFILTERED PERSPECTIVES FROM ENGINEERING & PRODUCT LEADERSHIP
          </div>
        </div>

        {/* Editorial Quote Box */}
        <div className="border border-[#24211D] bg-[#FFFDF9] p-8 sm:p-16 relative shadow-xs">
          <Quote className="w-12 h-12 text-[#B56A3A]/20 absolute top-8 right-8 sm:top-12 sm:right-12" />

          <div className="max-w-4xl space-y-8">
            <blockquote className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#24211D] leading-tight tracking-tight">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#CFC5B8] pt-8 gap-4">
              <div>
                <div className="font-sans font-bold text-lg text-[#24211D]">
                  {current.author}
                </div>
                <div className="font-mono text-xs text-[#5C5449] font-medium">
                  {current.role} &mdash; <span className="text-[#24211D] font-semibold">{current.company}</span>
                </div>
                {/* High contrast verified engagement proof badge */}
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#24211D] text-[#FFFDF9] font-mono text-xs font-semibold rounded-xs">
                  <CheckCircle className="w-3.5 h-3.5 text-[#B56A3A]" />
                  <span>VERIFIED ENGAGEMENT: {current.project}</span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-[#24211D] font-bold mr-2">
                  0{activeIndex + 1} / 0{TESTIMONIALS_DATA.length}
                </span>

                <button
                  id="testimonial-prev-btn"
                  onClick={prevTestimonial}
                  className="btn-icon"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4 text-[#24211D]" />
                </button>

                <button
                  id="testimonial-next-btn"
                  onClick={nextTestimonial}
                  className="btn-icon bg-[#24211D] text-[#FFFDF9] hover:bg-[#B56A3A] hover:border-[#B56A3A]"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
