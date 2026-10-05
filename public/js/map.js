const mapElement = document.getElementById("map");

const listing = JSON.parse(mapElement.dataset.listing);
const mapToken = mapElement.dataset.mapToken;

const map = new mapboxgl.Map({
  accessToken: mapToken,
  container: "map",
  center: listing.geometry.coordinates,
  zoom: 9,
});

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h4>${listing.title}</h4>
       <p>Exact location provided after booking</p>`,
    ),
  )
  .addTo(map);
