import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Container from '../../Components/Container';
import {Form, SubmitButton, List } from './styles';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  // Carregar os dadsos do LocalStorage
  componentDidMount(){
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState( {repositories: JSON.parse(repositories) });
    }
  }

  //Salvar os dados dp LocalStorage
  componentDidUpdate(_, prevState ){
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e =>{
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault(); /* Desabilitando a atualização da pag ao realizar
                          o subtmit do formulário */
    this.setState ({ loading: true });

    const { newRepo, repositories } = this.state;

    /* pegando os dados do repositório do GitHub,
    de acordo com o valor informado no input do
    formulário */
    const response = await api.get(`/repos/${newRepo}`);

    const data = { /* Pegando o nome do repositporio
                      do GitHub */
      name: response.data.full_name,
    };

    this.setState({
      /* imutabiidade do react
      Criando sempre um vetor, baseado no vetor já
      existente. Copia toda a informação já existente e add
      o novo valor */
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    })

  }

  render () {
    const { newRepo, loading, repositories } = this.state;

    return  (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
            <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}

          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repositories.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>

            </li>
          ))}
        </List>

      </Container>

    );
  }
}
