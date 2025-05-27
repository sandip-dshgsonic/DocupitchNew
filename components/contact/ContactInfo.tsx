'use client';

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1631234567890!5m2!1sen!2sus"
          className="w-full h-full rounded-lg"
          loading="lazy"
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Our Office</h3>
        <p className="text-gray-600">
          123 Innovation Street<br />
          Tech District<br />
          San Francisco, CA 94105
        </p>
      </div>
    </div>
  );
}