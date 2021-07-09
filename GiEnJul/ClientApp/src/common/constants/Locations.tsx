async function getLocations() {
    const locations = await fetch('/api/event/ActiveLocations')
        .then(response => response.json())
        .then(data => { return data });

    return locations;
}

export default getLocations;
