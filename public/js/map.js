
// const marker = new maptilersdk.Marker({
//     color: "red",
//     draggable: true
// })
//     .setLngLat([77.2090,28.6139])
//     .addTo(map);

console.log(thisLocation);

async function main(){
    try {
        const response = await fetch(`https://api.maptiler.com/geocoding/${thisLocation}.json?key=q3xXecQ1HHqP7j2HrBm8`);
        const data = await response.json();

        maptilersdk.config.apiKey = mapToken;
        const map = new maptilersdk.Map({
         container: 'map', // container's id or the HTML element to render the map
        style: maptilersdk.MapStyle.STREETS,
        center: data.features[0].geometry.coordinates, // starting position [Ing, lat] zoom: 14, // starting zoom  
        zoom:9,
        });

        const marker = new maptilersdk.Marker({color: "red"})
        .setLngLat(data.features[0].geometry.coordinates)
        .setPopup(new maptilersdk.Popup({offset:25})
        .setHTML(`<h5>${thisLocation}</h5><p>Exact location will be provided after booking!</p>`)) // add popup
        .addTo(map);
        console.log(data.features[0].geometry.coordinates)


      } catch (error) {
          console.error("Error fetching data:", error);
        }
}
main();