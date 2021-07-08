async function getLocations(): Promise<string[]> {
    return await fetch('/api/event/ActiveLocations').then((response) => response.json());
}

export default getLocations;
