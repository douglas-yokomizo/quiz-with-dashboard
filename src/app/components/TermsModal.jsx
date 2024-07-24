const TermsModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modalBackground" onClick={handleBackgroundClick}>
      <div className="modalContent relative">
        <h2 className="text-center pb-3">Termos de Uso</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-red-500"
        >
          X
        </button>
        <p>
          TERMO DE ADEQUAÇÃO LGPD Lei geral de proteção de dados Lei 13.709/2018
        </p>
        <p>
          Eu, através deste, concordo com o presente termo de adequação LGPD
          (Termo). O mesmo tem como objeto garantir a adequação da Empresa
          SCANNTECH BRASIL AUTOMAÇÃO COMERCIAL LTDA à Lei Geral de Proteção de
          Dados (Lei 13.709/2018).
        </p>
        <br />
        <p>
          A SCANNTECH BRASIL AUTOMAÇÃO COMERCIAL LTDA (Empresa) na qualidade de
          operador (a), que corresponde a pessoa jurídica, de direito público/
          privado, que realiza o tratamento de dados pessoais em nome do (a)
          Controlador (a), afirma que adota todas as medidas necessárias para
          assegurar a observância à Lei Geral de Proteção de Dados.
        </p>
        <br />
        <p>
          A SCANNTECH BRASIL AUTOMAÇÃO COMERCIAL LTDA, atua no ramo de atividade
          de soluções de tecnologia, ocasião em que dados sensíveis/ pessoais
          são coletados, sendo o seu objetivo o melhor relacionamento com os
          seus clientes e parceiros e sempre com respeito a privacidade dos
          dados recepcionados.
        </p>
        <br />
        <p>
          A Empresa se compromete a manter a confidencialidade e a integridade
          de todos os dados pessoais mantidos ou consultados/ transmitidos
          eletronicamente, para garantir a proteção desses dados, contra acesso
          não autorizado, destruição, uso, modificação, divulgação ou perda
          acidental ou indevida.Para fins de clareza, os dados pessoais
          correspondem as informações relacionadas às pessoas naturais
          identificadas ou identificáveis.
        </p>
        <br />
        <p>
          A Empresa se compromete a tratar os dados pessoais a que tiver acesso
          somente com as respectivas permissões dos titulares desses dados, ou
          seja, mediante as confirmações das pessoas naturais as quais se
          referem os dados pessoais que serão objeto de tratamento.
        </p>
        <br />
        <p>
          A empresa assegura que todos os seus colaboradores prepostos, sócios,
          diretores, representantes ou terceiros contratados que tenham acesso
          aos dados pessoais que estão sob a responsabilidade da empresa,
          assinaram o termo de confidencialidade, bem como comprometem-se a
          manter quaisquer DADOS PESSOAIS estritamente confidenciais e não os
          utilizar para outros fins, com exceção a prestação de serviços.
        </p>
        <br />
        <p>
          Os dados pessoais não poderão ser revelados a terceiros, com exceção
          da prévia autorização por escrito do titular dos dados pessoais, ou
          ainda na hipótese da empresa, por determinação legal ter que fornecer
          os dados pessoais a uma autoridade pública,ocasião em que o titular
          dos dados pessoais que deverá ser informado previamente,para que tome
          as medidas necessárias.
        </p>
        <br />
        ______________________________________________
        <br />
        SCANNTECH BRASIL AUTOMAÇÃO COMERCIAL LTDA
      </div>
    </div>
  );
};

export default TermsModal;
