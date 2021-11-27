export async function getCharts() {
  const data = await fetch(
    "https://s3-ap-southeast-1.amazonaws.com/he-public-data/chart2986176.json"
  );

  return await data.json();
}
