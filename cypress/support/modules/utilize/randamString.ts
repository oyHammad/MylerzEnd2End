export function generateRandomstring(prefix: string)
{
    const leftpad = (value: string, resultLength = 2, leftpadChar = "0") =>
    {
        return (String(leftpadChar).repeat(resultLength)
            + String(value)).slice(String(value).length);
    };
    const date = new Date();
    return prefix
        + date.getFullYear()
        + leftpad(`${date.getMonth() + 1}`, 2)
        + leftpad(`${date.getDate()}`, 2)
        + leftpad(`${date.getHours()}`, 2)
        + leftpad(`${date.getMinutes()}`, 2)
        + leftpad(`${date.getSeconds()}`, 2)
        + leftpad(`${date.getMilliseconds()}`, 3);
}