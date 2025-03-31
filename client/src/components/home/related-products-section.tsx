import { data } from "@/data/mock-data";

export function RelatedProductsSection() {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-sans text-xl font-bold">Users Also Viewed</h2>
        <a href="#" className="text-secondary hover:underline text-sm">View All</a>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {data.relatedProducts.map((product, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition">
            <div className="relative mb-2">
              <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded" />
              <span className="absolute bottom-1 right-1 bg-white/80 text-xs font-bold px-1.5 py-0.5 rounded">{product.price}</span>
            </div>
            <h3 className="text-sm font-semibold truncate">{product.name}</h3>
            <div className="flex items-center text-xs mt-1">
              <img src={product.storeLogo} alt={product.storeName} className="h-3 w-3 mr-1" />
              <span className="text-gray-600">{product.storeName}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
