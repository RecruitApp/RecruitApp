let entrypoint

process.env.NODE_ENV === 'development'
? entrypoint = 'https://localhost:8443'
: entrypoint = 'https://lftrip.fr/api/v1'

export default entrypoint
