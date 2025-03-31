import { data } from "@/data/mock-data";

export function CategoriesSection() {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-sans text-xl font-bold">Shop By Category</h2>
        <a href="#" className="text-secondary hover:underline text-sm">View All</a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.categories.map((category, index) => (
          <a href="#" key={index} className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center transition hover:shadow-md">
            <div className={`w-12 h-12 ${category.bgColor} rounded-full flex items-center justify-center mb-2`}>
              {category.icon}
            </div>
            <span className="text-sm font-semibold text-center">{category.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
