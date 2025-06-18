export default function (regexp) {
    const match = regexp
        .toString()
        .replace('/^', '')
        .replace('\\/?(?=\\/|$)/i', '')
        .replace(/\\\//g, '/')
        .replace(/\\\./g, '.')
        .replace(/\$$/, '')
        .replace(/\//g, '/');

    return match === '^' ? '' : match;
}