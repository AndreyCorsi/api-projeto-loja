export interface Produto {
    id?: number;
    nome: string;
    preco: number;
    descricao: string;
    tamanho: string; 
    cor: string;
    marca: string;
    codigo_barras: string;
    estoque: number;
    custo: number;
    venda: number;
    margem: number;
    promocional: number;
    id_fornecedor: number;
    id_categoria_roupa: number;
    status?: string;
}