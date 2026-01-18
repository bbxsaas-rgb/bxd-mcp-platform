import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { projectService } from "./lib/projectService.js";
import { testSuiteService } from "./lib/testSuiteService.js";
import { testRunService } from "./testRunService.js";

/**
 * Servidor MCP para o BXD-MCP Platform
 * Este servidor permite que editores como Cursor e VS Code interajam com
 * seus projetos e suites de teste diretamente via IA.
 */

const server = new Server(
  {
    name: "bxd-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Lista as ferramentas disponíveis para a IA
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_projects",
        description: "Lista todos os projetos cadastrados na plataforma BXD-MCP",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "list_test_suites",
        description: "Lista as suites de teste de um projeto específico",
        inputSchema: {
          type: "object",
          properties: {
            projectId: { type: "string", description: "ID do projeto" },
          },
          required: ["projectId"],
        },
      },
      {
        name: "run_test_suite",
        description: "Inicia a execução de uma suite de testes",
        inputSchema: {
          type: "object",
          properties: {
            suiteId: { type: "string", description: "ID da suite de teste" },
            suiteName: { type: "string", description: "Nome da suite de teste" },
          },
          required: ["suiteId", "suiteName"],
        },
      },
    ],
  };
});

/**
 * Lida com as chamadas de ferramentas
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "list_projects": {
        const projects = projectService.getProjects();
        return {
          content: [{ type: "text", text: JSON.stringify(projects, null, 2) }],
        };
      }

      case "list_test_suites": {
        const { projectId } = z.object({ projectId: z.string() }).parse(args);
        const suites = testSuiteService.getSuites(projectId);
        return {
          content: [{ type: "text", text: JSON.stringify(suites, null, 2) }],
        };
      }

      case "run_test_suite": {
        const { suiteId, suiteName } = z.object({ 
          suiteId: z.string(), 
          suiteName: z.string() 
        }).parse(args);
        
        const run = testRunService.createRun(suiteId, suiteName, "IA / MCP");
        return {
          content: [{ 
            type: "text", 
            text: `Execução iniciada com sucesso! ID da Run: ${run.id}. Você pode acompanhar o progresso no Dashboard.` 
          }],
        };
      }

      default:
        throw new Error(`Ferramenta desconhecida: ${name}`);
    }
  } catch (error) {
    return {
      content: [{ type: "text", text: `Erro: ${error instanceof Error ? error.message : String(error)}` }],
      isError: true,
    };
  }
});

/**
 * Inicializa o servidor usando transporte STDIO
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("BXD-MCP Server rodando via STDIO");
}

main().catch((error) => {
  console.error("Erro fatal no servidor MCP:", error);
  process.exit(1);
});
