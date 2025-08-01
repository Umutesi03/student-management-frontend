import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-green-700 dark:from-primary dark:to-primary/90 text-white">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 mx-auto">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Ready to transform your institution?
            </h2>
            <p className="text-lg text-green-50 mb-8">
              Join thousands of educational institutions already using StudentM
              to streamline their operations and improve student outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-12 px-8 bg-white text-green-600 hover:bg-green-50 hover:text-green-700"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 border border-white text-white hover:bg-white/10"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
              <div className="flex items-center mb-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-white/20">
                  <Image
                    src="/images/testimonial-avatar.jpg"
                    alt="Sarah Johnson"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-green-100">
                    Principal, Lincoln High School
                  </p>
                </div>
              </div>
              <blockquote className="text-lg italic text-green-50 mb-6">
                StudentM has transformed how we manage our institution. The
                analytics alone have helped us improve student retention by 15%
                in just one semester.
              </blockquote>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-5 w-5 text-yellow-300 fill-current"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
