import {
  authServerMetadataHandlerClerk,
  metadataCorsOptionsRequestHandler,
} from '@clerk/mcp-tools/next'

/**
 * OAuth Authorization Server Metadata Endpoint
 *
 * Returns the OAuth 2.0 Authorization Server Metadata as defined in:
 * https://tools.ietf.org/html/rfc8414
 *
 * This endpoint is public and required by MCP clients to discover
 * authorization server capabilities and endpoints.
 */

const handler = authServerMetadataHandlerClerk()
const corsHandler = metadataCorsOptionsRequestHandler()

export { handler as GET, corsHandler as OPTIONS }
