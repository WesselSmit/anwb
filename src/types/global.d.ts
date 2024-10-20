// NOTE: in a real app the translations file would be fetched from a 3rd party and you would generate the types (e.g. eusing something like Zod)
declare module 'messages.json' {
  const value: Messages;
  export default value;
}
