export const getAddressFromCoordinates = async (latitude, longitude) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "CRISP/1.0.9 crisp.uccbscs@gmail.com",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error fetching address:", errorText);
      return null;
    }

    const data = await response.json();

    if (data && data.address) {
      // Try to extract all address components
      const { residential, road, neighbourhood } = data.address;

      // Include all parts to form a full address
      const addressParts = [residential, road, neighbourhood].filter(Boolean); // filter out null/undefined values

      // Join all parts into a single string
      const address = addressParts.join(", ") || "Address not found";
      // console.log("Fetched address:", address);
      return address;
    } else {
      console.error("Nominatim API error:", data);
      return "Address not found";
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
};
