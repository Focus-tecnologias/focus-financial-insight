import { createFileRoute } from '@tanstack/react-router';
import { EstoquePatrimonioScreen } from '@/features/estoquePatrimonio/components/EstoquePatrimonioScreen';

export const Route = createFileRoute('/estoque/$')({
  component: EstoqueSplatPage,
});

function EstoqueSplatPage() {
  return <EstoquePatrimonioScreen />;
}
