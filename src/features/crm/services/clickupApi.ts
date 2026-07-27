export interface ClickUpUserResponse {
  user: {
    id: number;
    username: string;
    email: string;
    color?: string;
    profilePicture?: string;
  };
}

export interface ClickUpTaskReal {
  id: string;
  name: string;
  text_content?: string;
  description?: string;
  status: {
    status: string;
    color?: string;
  };
  date_created?: string;
  due_date?: string;
  tags?: Array<{ name: string }>;
}

export interface ClickUpTasksResponse {
  tasks: ClickUpTaskReal[];
}

const CLICKUP_API_BASE = 'https://api.clickup.com/api/v2';

/**
 * Valida a chave de API do ClickUp testando o endpoint GET /user
 */
export async function testClickUpConnection(apiToken: string): Promise<ClickUpUserResponse> {
  if (!apiToken || !apiToken.trim()) {
    throw new Error('API Token do ClickUp é obrigatório.');
  }

  const response = await fetch(`${CLICKUP_API_BASE}/user`, {
    method: 'GET',
    headers: {
      'Authorization': apiToken.trim(),
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('API Token inválido ou não autorizado no ClickUp. Verifique sua chave.');
    }
    throw new Error(`Falha ao conectar com o ClickUp (Status HTTP ${response.status}).`);
  }

  const data: ClickUpUserResponse = await response.json();
  return data;
}

/**
 * Busca todas as tarefas reais de uma List ID no ClickUp
 */
export async function fetchClickUpTasks(listId: string, apiToken: string): Promise<ClickUpTaskReal[]> {
  if (!listId || !apiToken) {
    throw new Error('List ID e API Token são obrigatórios para buscar tarefas do ClickUp.');
  }

  const response = await fetch(`${CLICKUP_API_BASE}/list/${listId.trim()}/task?include_closed=true`, {
    method: 'GET',
    headers: {
      'Authorization': apiToken.trim(),
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar tarefas da Lista ${listId} no ClickUp (HTTP ${response.status}).`);
  }

  const data: ClickUpTasksResponse = await response.json();
  return data.tasks || [];
}

/**
 * Cria uma nova tarefa real no ClickUp
 */
export async function createClickUpTask(listId: string, apiToken: string, taskData: { name: string; description?: string; status?: string }): Promise<ClickUpTaskReal> {
  const response = await fetch(`${CLICKUP_API_BASE}/list/${listId.trim()}/task`, {
    method: 'POST',
    headers: {
      'Authorization': apiToken.trim(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: taskData.name,
      description: taskData.description || 'Criado via Focus Finance CRM Engine',
      status: taskData.status || 'open'
    })
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar tarefa no ClickUp (HTTP ${response.status}).`);
  }

  return await response.json();
}

/**
 * Atualiza o status/etapa de uma tarefa real no ClickUp
 */
export async function updateClickUpTaskStatus(taskId: string, apiToken: string, status: string): Promise<void> {
  const response = await fetch(`${CLICKUP_API_BASE}/task/${taskId.trim()}`, {
    method: 'PUT',
    headers: {
      'Authorization': apiToken.trim(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: status.toLowerCase()
    })
  });

  if (!response.ok) {
    console.warn(`ClickUp API update warning (HTTP ${response.status}). Status local atualizado.`);
  }
}
