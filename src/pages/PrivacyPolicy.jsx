import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const sections = [
  {
    title: "1. Introdução e Compromisso",
    content: `Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos as informações pessoais fornecidas ao se inscrever na lista de espera do aplicativo Aurum.

Nossa atuação está alinhada com a Lei Geral de Proteção de Dados Pessoais (Lei 13.709/2018 - LGPD) e com o compromisso de transparência e segurança no tratamento de dados pessoais.

Ao preencher e enviar o formulário da lista de espera, o titular declara estar ciente e de acordo com os termos desta Política.`,
  },
  {
    title: "2. Dados Pessoais Coletados e Finalidades",
    table: [
      { dado: "Nome completo", finalidade: "Identificar o titular, permitir contato formal e personalizar a comunicação relacionada à lista de espera e ao futuro contrato.", base: "Art. 7º, V — procedimentos preliminares relacionados ao contrato, a pedido do titular." },
      { dado: "E-mail", finalidade: "Confirmação de inscrição, envio de informações sobre o aplicativo e convite para beta.", base: "Art. 7º, V — procedimentos preliminares relacionados ao contrato." },
      { dado: "Número do WhatsApp", finalidade: "Canal complementar para lembretes, convites para o beta e suporte durante testes.", base: "Art. 7º, V — procedimentos preliminares relacionados ao contrato." },
      { dado: "Renda mensal", finalidade: "Compreender o perfil econômico dos inscritos e subsidiar decisões sobre funcionalidades.", base: "Art. 7º, V — vinculada ao desenvolvimento do produto." },
      { dado: "Profissão atual", finalidade: "Análise agregada do perfil dos inscritos e definição de conteúdo e funcionalidades.", base: "Art. 7º, V — auxiliar ao desenvolvimento do produto." },
      { dado: "Informação se já investe hoje", finalidade: "Segmentar o público por nível de familiaridade com investimentos e estruturar grupos de testes beta.", base: "Art. 7º, V — auxiliando na modelagem do produto." },
      { dado: "Objetivo financeiro principal", finalidade: "Entender metas e dificuldades financeiras para priorizar funcionalidades do app.", base: "Art. 7º, V — para adequar o produto à demanda do titular." },
      { dado: "Preferência em receber convite para beta", finalidade: "Registrar uma manifestação de vontade do titular e organizar o envio de convites.", base: "Art. 7º, V — procedimentos preliminares relacionados ao contrato, a pedido do titular." },
    ],
  },
  {
    title: "3. Forma de Coleta dos Dados",
    content: `Os dados são coletados de forma direta, por meio de preenchimento voluntário do formulário na landing page de lista de espera, sem uso de meios enganosos ou abusivos.

O envio do formulário é entendido como um pedido do titular para participar de procedimentos preliminares relacionados a um possível contrato de uso do aplicativo.`,
  },
  {
    title: "4. Compartilhamento de Dados Pessoais",
    content: `4.1. Prestadores de serviços (operadores)
A Controladora poderá compartilhar dados com empresas parceiras que prestam serviços de:
• Envio de e-mails e gestão de campanhas (ferramentas de e-mail marketing);
• Gestão de relacionamento com clientes (CRM);
• Análise de dados e métricas (analítica);
• Hospedagem e armazenamento em nuvem.

Esses parceiros atuam como operadores de dados, seguindo as instruções da Controladora e obrigações de confidencialidade e segurança, nos termos da LGPD.

4.2. Obrigações legais e proteção de direitos
Os dados poderão ser compartilhados para:
• Cumprimento de obrigações legais ou regulatórias;
• Atendimento a requisições de autoridades competentes;
• Exercício regular de direitos em processo judicial, administrativo ou arbitral;
• Proteção da segurança e integridade da Controladora, dos titulares de dados e de terceiros.

4.3. Transferência Internacional
Caso algum prestador de serviço utilize servidores no exterior, serão adotados mecanismos de proteção adequados, em conformidade com o previsto na LGPD.`,
  },
  {
    title: "5. Prazo de Armazenamento dos Dados",
    content: `Os dados serão armazenados pelo período necessário para atender às finalidades descritas, em especial:
• Durante a existência da lista de espera;
• Durante a fase beta e eventuais etapas anteriores à contratação;
• Pelo tempo necessário para cumprimento de obrigações legais ou exercício regular de direitos.

Encerradas as finalidades, os dados poderão ser excluídos de forma segura ou anonimizados para uso em estatísticas e análises agregadas.`,
  },
  {
    title: "6. Medidas de Segurança",
    content: `A Controladora adota medidas técnicas e administrativas de segurança, incluindo:
• Controle de acesso restrito a pessoas autorizadas;
• Uso de senhas, autenticação e criptografia;
• Registros de logs de acesso a sistemas;
• Seleção criteriosa de prestadores de serviço.

Caso ocorra algum incidente de segurança relevante, serão adotados os procedimentos de comunicação previstos na LGPD.`,
  },
  {
    title: "7. Direitos dos Titulares de Dados",
    content: `Nos termos da LGPD, o titular tem os seguintes direitos:
• Confirmação da existência de tratamento;
• Acesso aos dados pessoais;
• Correção de dados incompletos, inexatos ou desatualizados;
• Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;
• Portabilidade de dados para outro fornecedor;
• Eliminação dos dados tratados com base em consentimento;
• Informação sobre compartilhamento com entidades públicas ou privadas;
• Informação sobre a possibilidade de não fornecer informações e suas consequências;
• Revogação do consentimento, quando aplicável.`,
  },
  {
    title: "8. Uso de Cookies e Tecnologias Semelhantes",
    content: `A landing page poderá utilizar cookies para:
• Garantir o funcionamento adequado do site (cookies necessários);
• Medir, de forma agregada, a navegação dos usuários para melhorar a experiência (cookies de desempenho e analíticos).

O titular poderá gerenciar as opções de cookies diretamente em seu navegador. O banner de cookies informa as categorias utilizadas e permite a escolha de consentimento para os não necessários.`,
  },
  {
    title: "9. Base Legal do Tratamento de Dados",
    content: `Base legal principal: Art. 7º, V da LGPD — tratamento necessário para a execução de contrato ou de procedimentos preliminares relacionados a contrato do qual seja parte o titular, a pedido do titular dos dados.

A inscrição na lista de espera e o fornecimento voluntário das informações são considerados pedidos do titular para participação em procedimentos preliminares relacionados a um possível contrato de uso do aplicativo.`,
  },
  {
    title: "10. Alterações desta Política de Privacidade",
    content: `Esta Política poderá ser alterada a qualquer tempo para refletir mudanças no tratamento de dados, atualizações legislativas ou de boas práticas. Quando houver alterações relevantes, poderá ser enviado aviso por e-mail ou comunicação exibida na landing page. A data da última atualização será sempre indicada no início do documento.`,
  },
  {
    title: "11. Contato e Encarregado (DPO)",
    content: `Para esclarecimentos, solicitações ou exercício de direitos:

E-mail: dpo@aurum.com.br
Encarregado de dados: João Lucas Soares Alves
Telefone: (51) 93300-5747

O DPO é responsável por receber comunicações dos titulares e da autoridade nacional, orientar os colaboradores e zelar pelo cumprimento da LGPD.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black px-6 py-16">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#D4AF37]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative">
        {/* Back */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link
            to={createPageUrl("Home")}
            className="inline-flex items-center gap-2 text-[#BFBFBF] text-sm hover:text-[#D4AF37] transition-colors mb-10"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para o início
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <span className="text-[#D4AF37] text-xs tracking-widest uppercase">Legal</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-white leading-tight">
            Política de Privacidade
          </h1>
          <p className="mt-2 text-[#BFBFBF] text-sm">Última atualização: 13 de abril de 2026</p>
          <p className="mt-4 text-[#BFBFBF] text-sm leading-relaxed">
            <span className="text-white font-medium">Controlador dos Dados:</span> [Inserir Razão Social da Empresa], CNPJ [Inserir CNPJ], doravante denominado simplesmente "Controladora".
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-[#0E0E0E] border border-white/5 rounded-2xl p-6 md:p-8"
            >
              <h2 className="text-white font-semibold text-base mb-4 text-[#D4AF37]">{section.title}</h2>

              {section.content && (
                <p className="text-[#BFBFBF] text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
              )}

              {section.table && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-[#D4AF37] font-medium py-2 pr-4 min-w-[140px]">Dado Pessoal</th>
                        <th className="text-left text-[#D4AF37] font-medium py-2 pr-4">Finalidade</th>
                        <th className="text-left text-[#D4AF37] font-medium py-2 min-w-[180px]">Base Legal (LGPD)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.map((row, j) => (
                        <tr key={j} className="border-b border-white/5">
                          <td className="text-white py-3 pr-4 align-top font-medium">{row.dado}</td>
                          <td className="text-[#BFBFBF] py-3 pr-4 align-top leading-relaxed">{row.finalidade}</td>
                          <td className="text-[#BFBFBF] py-3 align-top leading-relaxed">{row.base}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link
            to={createPageUrl("Home")}
            className="inline-block bg-[#D4AF37] hover:bg-[#B8860B] text-black font-semibold text-sm px-10 py-3.5 rounded-full transition-all duration-300 tracking-wide shadow-lg shadow-[#D4AF37]/20 hover:scale-105"
          >
            Voltar para a página inicial
          </Link>
        </motion.div>
      </div>
    </div>
  );
}