export default async function (databaseName, filter, url) {

    const data = {
        databaseName : databaseName,
        filter : filter
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    return await fetch(url, options).then(async (result) => {
        return await result.json();
    });
}