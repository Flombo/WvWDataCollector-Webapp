export default async function (databaseName, filter, datetimeOption, url) {

    const data = {
        databaseName : databaseName,
        filter : filter,
        datetime : datetimeOption
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