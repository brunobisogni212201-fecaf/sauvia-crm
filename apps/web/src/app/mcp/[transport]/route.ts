import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createMcpHandler, withMcpAuth } from "mcp-handler";
import { verifyClerkToken } from "@clerk/mcp-tools/next";
import { createBackendClient } from "@/lib/mcp/backend-client";

/**
 * MCP Server Route Handler
 * Implements the Model Context Protocol for AI integration
 * Supports HTTP Streaming and WebSocket transports
 */

// Initialize MCP handler with tools
const mcpServer = createMcpHandler((server) => {
  // ──────────────────────────────────────────────────────────────
  // Tool 1: Get Current User
  // ──────────────────────────────────────────────────────────────
  server.tool(
    "get-sauvia-user",
    "Get current authenticated user information",
    {
      type: "object",
      properties: {},
    },
    async (params: any, { authInfo }: any) => {
      try {
        const token = authInfo?.extra?.token as string;
        if (!token) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { error: "No authentication token available" },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        const client = createBackendClient();
        const response = await client.getCurrentUser(token);

        if (!response.ok) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { error: response.error || "Failed to fetch user" },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response.data, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error:
                    error instanceof Error ? error.message : "Unknown error",
                },
                null,
                2,
              ),
            },
          ],
          isError: true,
        };
      }
    },
  );

  // ──────────────────────────────────────────────────────────────
  // Tool 2: List Patients
  // ──────────────────────────────────────────────────────────────
  server.tool(
    "list-patients",
    "List all patients for the current nutritionist",
    {
      type: "object",
      properties: {
        page: {
          type: "number",
          description: "Page number (default: 1)",
        },
        limit: {
          type: "number",
          description: "Items per page (default: 20)",
        },
        search: {
          type: "string",
          description: "Search by name or email",
        },
      },
    },
    async (params: any, { authInfo }: any) => {
      try {
        const token = authInfo?.extra?.token as string;
        if (!token) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { error: "No authentication token available" },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        const client = createBackendClient();
        const response = await client.listPatients(token, {
          page: params?.page || 1,
          limit: params?.limit || 20,
          search: params?.search,
        });

        if (!response.ok) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { error: response.error || "Failed to fetch patients" },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response.data, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error:
                    error instanceof Error ? error.message : "Unknown error",
                },
                null,
                2,
              ),
            },
          ],
          isError: true,
        };
      }
    },
  );

  // ──────────────────────────────────────────────────────────────
  // Tool 3: Get Patient Details
  // ──────────────────────────────────────────────────────────────
  server.tool(
    "get-patient-details",
    "Get detailed information about a specific patient",
    {
      type: "object",
      properties: {
        patient_id: {
          type: "string",
          description: "The patient ID",
        },
      },
      required: ["patient_id"],
    },
    async (params: any, { authInfo }: any) => {
      try {
        const token = authInfo?.extra?.token as string;
        if (!token) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { error: "No authentication token available" },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        const client = createBackendClient();
        const response = await client.getPatient(token, params?.patient_id);

        if (!response.ok) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { error: response.error || "Failed to fetch patient" },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response.data, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error:
                    error instanceof Error ? error.message : "Unknown error",
                },
                null,
                2,
              ),
            },
          ],
          isError: true,
        };
      }
    },
  );

  // ──────────────────────────────────────────────────────────────
  // Tool 4: Get Dashboard Metrics
  // ──────────────────────────────────────────────────────────────
  server.tool(
    "get-dashboard-metrics",
    "Get overview metrics for the nutritionist dashboard",
    {
      type: "object",
      properties: {},
    },
    async (params: any, { authInfo }: any) => {
      try {
        const token = authInfo?.extra?.token as string;
        if (!token) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { error: "No authentication token available" },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        const client = createBackendClient();
        const response = await client.getDashboardMetrics(token);

        if (!response.ok) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { error: response.error || "Failed to fetch metrics" },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response.data, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error:
                    error instanceof Error ? error.message : "Unknown error",
                },
                null,
                2,
              ),
            },
          ],
          isError: true,
        };
      }
    },
  );

  // ──────────────────────────────────────────────────────────────
  // Tool 5: Get Patient Adherence
  // ──────────────────────────────────────────────────────────────
  server.tool(
    "get-patient-adherence",
    "Get adherence metrics for a specific patient",
    {
      type: "object",
      properties: {
        patient_id: {
          type: "string",
          description: "The patient ID",
        },
      },
      required: ["patient_id"],
    },
    async (params: any, { authInfo }: any) => {
      try {
        const token = authInfo?.extra?.token as string;
        if (!token) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { error: "No authentication token available" },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        const client = createBackendClient();
        const response = await client.getPatientAdherence(
          token,
          params?.patient_id,
        );

        if (!response.ok) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { error: response.error || "Failed to fetch adherence" },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response.data, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error:
                    error instanceof Error ? error.message : "Unknown error",
                },
                null,
                2,
              ),
            },
          ],
          isError: true,
        };
      }
    },
  );

  // ──────────────────────────────────────────────────────────────
  // Tool 6: Get Patient Plans
  // ──────────────────────────────────────────────────────────────
  server.tool(
    "get-patient-plans",
    "Get all health plans for a patient",
    {
      type: "object",
      properties: {
        patient_id: {
          type: "string",
          description: "The patient ID",
        },
        active_only: {
          type: "boolean",
          description: "Show only active plans (default: false)",
        },
      },
      required: ["patient_id"],
    },
    async (params: any, { authInfo }: any) => {
      try {
        const token = authInfo?.extra?.token as string;
        if (!token) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { error: "No authentication token available" },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        const client = createBackendClient();
        const response = await client.listPatientPlans(
          token,
          params?.patient_id,
          {
            active: params?.active_only,
          },
        );

        if (!response.ok) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { error: response.error || "Failed to fetch plans" },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response.data, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error:
                    error instanceof Error ? error.message : "Unknown error",
                },
                null,
                2,
              ),
            },
          ],
          isError: true,
        };
      }
    },
  );

  // ──────────────────────────────────────────────────────────────
  // Tool 7: Get Routine Logs
  // ──────────────────────────────────────────────────────────────
  server.tool(
    "get-routine-logs",
    "Get routine activity logs for a patient",
    {
      type: "object",
      properties: {
        patient_id: {
          type: "string",
          description: "The patient ID",
        },
        days: {
          type: "number",
          description: "Number of days to retrieve (default: 7)",
        },
        type: {
          type: "string",
          description:
            "Filter by activity type (MEAL, EXERCISE, MEDICATION, WATER, HABIT)",
        },
      },
      required: ["patient_id"],
    },
    async (params: any, { authInfo }: any) => {
      try {
        const token = authInfo?.extra?.token as string;
        if (!token) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { error: "No authentication token available" },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        const client = createBackendClient();
        const response = await client.getRoutineLogs(
          token,
          params?.patient_id,
          {
            days: params?.days || 7,
            type: params?.type,
          },
        );

        if (!response.ok) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { error: response.error || "Failed to fetch logs" },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response.data, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error:
                    error instanceof Error ? error.message : "Unknown error",
                },
                null,
                2,
              ),
            },
          ],
          isError: true,
        };
      }
    },
  );

  // ──────────────────────────────────────────────────────────────
  // Tool 8: Send WhatsApp Message
  // ──────────────────────────────────────────────────────────────
  server.tool(
    "send-whatsapp-message",
    "Send a WhatsApp message to a patient",
    {
      type: "object",
      properties: {
        patient_id: {
          type: "string",
          description: "The patient ID",
        },
        message: {
          type: "string",
          description: "The message to send",
        },
      },
      required: ["patient_id", "message"],
    },
    async (params: any, { authInfo }: any) => {
      try {
        const token = authInfo?.extra?.token as string;
        if (!token) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { error: "No authentication token available" },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        const client = createBackendClient();
        const response = await client.sendWhatsAppMessage(
          token,
          params?.patient_id,
          params?.message,
        );

        if (!response.ok) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { error: response.error || "Failed to send message" },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  message: "WhatsApp message sent successfully",
                  data: response.data,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error:
                    error instanceof Error ? error.message : "Unknown error",
                },
                null,
                2,
              ),
            },
          ],
          isError: true,
        };
      }
    },
  );

  // ──────────────────────────────────────────────────────────────
  // Tool 9: Get WhatsApp Status
  // ──────────────────────────────────────────────────────────────
  server.tool(
    "get-whatsapp-status",
    "Check WhatsApp connection status",
    {
      type: "object",
      properties: {},
    },
    async (params: any, { authInfo }: any) => {
      try {
        const token = authInfo?.extra?.token as string;
        if (!token) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { error: "No authentication token available" },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        const client = createBackendClient();
        const response = await client.getWhatsAppStatus(token);

        if (!response.ok) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    error: response.error || "Failed to fetch WhatsApp status",
                  },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response.data, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error:
                    error instanceof Error ? error.message : "Unknown error",
                },
                null,
                2,
              ),
            },
          ],
          isError: true,
        };
      }
    },
  );
});

// Wrap with MCP auth middleware
const authHandler = withMcpAuth(
  mcpServer,
  async (req, token) => {
    // Verify Clerk token
    const clerkAuth = await auth();
    return {
      userId: clerkAuth.userId || "",
      organizationId: clerkAuth.orgId || "",
      email: clerkAuth.sessionClaims?.email || "",
      scopes: ["read:patients", "write:messages"],
      extra: {
        token,
        userId: clerkAuth.userId,
      },
    };
  },
  {
    required: true,
    resourceMetadataPath: "/.well-known/oauth-protected-resource/mcp",
  },
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ transport: string }> },
) {
  const { transport } = await params;
  return authHandler(request, { params: { transport } });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ transport: string }> },
) {
  const { transport } = await params;
  return authHandler(request, { params: { transport } });
}
