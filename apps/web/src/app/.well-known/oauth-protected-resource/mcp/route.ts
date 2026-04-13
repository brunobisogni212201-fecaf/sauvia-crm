import {
  metadataCorsOptionsRequestHandler,
  protectedResourceHandlerClerk,
} from '@clerk/mcp-tools/next'

/**
 * OAuth Protected Resource Metadata Endpoint
 *
 * This endpoint provides metadata about the MCP protected resource
 * for OAuth clients to discover available scopes and capabilities.
 *
 * GET: Returns protected resource metadata in JSON format
 * OPTIONS: Handles CORS preflight requests
 */

const handler = protectedResourceHandlerClerk({
  scopes_supported: [
    'profile',
    'email',
    'openid',
    'read:patients',
    'write:patients',
    'read:plans',
    'write:plans',
    'read:logs',
    'write:logs',
    'read:whatsapp',
    'write:whatsapp',
  ],
})

const corsHandler = metadataCorsOptionsRequestHandler()

export { handler as GET, corsHandler as OPTIONS }
