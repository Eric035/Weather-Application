window.addEventListener('load', ()=>
{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.Temperature-description');
    let temperatureDegree = document.querySelector('.Temperature-degree');
    let locationTimezone = document.querySelector('.Location-Timezone');
    let temperatureSection = document.querySelector('.Temperature');
    const temperatureSpan = document.querySelector('.Temperature span');

    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position => 
            {
                long = position.coords.longitude;
                lat = position.coords.latitude;

                const proxy = `https://cors-anywhere.herokuapp.com/`;
                const api = `${proxy}https://api.darksky.net/forecast/837ce46b8a72db8e6f9812350fa9fc5f/${lat},${long}`;

            fetch(api)
                .then(data => {
                    return data.json();
                })
                .then(data =>{
                    console.log(data);       // To print out the result obtained back from the API.
                    const {temperature, summary, icon} = data.currently;         // Elements that we need.
                    // Set DOM elements from the API

                    temperatureDegree.textContent = Math.round(temperature);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;          // Can be found directly under the property                                                           timezone of data.
                    // Setting icons 
                    iconSetter(icon, document.querySelector(".icon")); 

                    // Converting Farenheit to Celsius 
                    let celsius = (temperature - 32) * (5 / 9);         // Formula from internet

                    // Our button to change from Farenheit to Celsius 
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "°F"){
                            temperatureSpan.textContent = "°C";
                            temperatureDegree.textContent = Math.floor(celsius);    
                        }
                        else{
                            temperatureSpan.textContent ="°F";
                            temperatureDegree.textContent = Math.round(temperature);
                        }
                    });
                }); 
            });
    }
    else
    {
        h1.textContent = "Please enable your location services."
    }

    function iconSetter(icon, iconID){
        const skycons = new Skycons({"color": "white"});
        const curIcon = icon.replace(/-/g, "_").toUpperCase();                // Replace dash with underscores
        skycons.play();
        return skycons.set(iconID, Skycons[curIcon]);
    }
});