// app/lib/sheets.js
export async function fetchGoogleSheetData() {
  const res = await fetch(
    'https://docs.google.com/spreadsheets/d/1cFhgGH1P2bUguL-wV8GxOdreEJF-hYHwJdL9N_ec3Cg/gviz/tq?tqx=out:csv&sheet=solar_panels'
  );
  const csvData = await res.text();

  // Parse CSV data into an array of product objects
  const products = csvData.split('\n').slice(1).map(row => {
    const [name, category, manufacturer, model, price, description] = row.split(',');

    return {
      name: name || '',
      category: category || '',
      manufacturer: manufacturer || '',
      model: model || '',
      price: parseFloat(price) || 0,
      description: description || '',
    };
  });

  return products;
}
