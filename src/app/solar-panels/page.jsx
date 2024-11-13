// app/solar-panels/page.js
async function fetchGoogleSheetData() {
  const res = await fetch(
    'https://docs.google.com/spreadsheets/d/1cFhgGH1P2bUguL-wV8GxOdreEJF-hYHwJdL9N_ec3Cg/gviz/tq?tqx=out:csv&sheet=solar_panels'
  );
  const csvData = await res.text();

  // Parse CSV data
  const products = csvData.split('\n').slice(1).map(row => {
    const [name, manufacturer, model, price, description] = row.split(',');
    
    console.log(name, price)
    return {
      name: name.slice(1, -1) || '',
      manufacturer: manufacturer.slice(1, -1) || '',
      model: model.slice(1, -1) || '',
      price: price.slice(1, -1) || 'ask for price',
      description: description.slice(1, -1) || '',
    };
  });

  return products;
}




export default async function SolarPanelsPage() {
  const products = await fetchGoogleSheetData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Solar Panels</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>Manufacturer: {product.manufacturer}</p>
            <p>Model: {product.model}</p>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
