import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { post } from '../apis/api';
import config from '../config';

export default class WordSuggestionService {
  public getGroup(
    groupId: string
  ): Observable<any> { // @todo fix any pls
    return of(true) // @todo fix mock pls
      .pipe(
        map(() => {
          return {
            stepsCap: 6,
            total: 10,
            currentStep: 0,
            groups: [
              {
                id: '7uk46j4',
                text: 'Ler em voz alta faz bem para pronúncia, memória e entendimento do texto',
                spoken: false,
              },
              {
                id: '5ey6kyk',
                text: 'Ciência é descobrir a verdade a partir das descobertas anteriores',
                spoken: false,
              },
              {
                id: 'kr78ruy',
                text: 'Corpus é uma coleção eletrônica de excertos de uma linguagem',
                spoken: true,
              },
              {
                id: 'uaq3t4t',
                text: 'Para ensinar uma linguagem a um computador, é preciso ter muitos exemplos de uso',
                spoken: false,
              },
              {
                id: 'sf75se4',
                text: 'Produzimos sons com o ar do pulmão vibrando por meio de nossas cordas vocais',
                spoken: false,
              },
              {
                id: 'gt9der5',
                text: 'A ciência cidadã ajuda na geração e análise de dados',
                spoken: false,
              },
              {
                id: 'a2q35ay',
                text: 'Mesmo durante a quarentena, pesquisadores se mantiveram felizes',
                spoken: false,
              },
              {
                id: '4g23gg4',
                text: 'Meu grande objetivo é me tornar um escalador profissional reconhecido nacionalmente',
                spoken: false,
              },
              {
                id: '89eygh2',
                text: 'Eu adoro jogar futebol com meus amigos da escola e sinto falta das atividades esportivas',
                spoken: false,
              },
              {
                id: '23atwge',
                text: 'Se algum dia eu terminar o mestrado vou gritar de felicidade até ficar rouco',
                spoken: false,
              },
            ]
          }
        }),
      );
  }

  public blacklist(word: string, reason: string): Observable<void> {
    const url = config.endpoints.blacklist;
    return post<void>(url, { word });
  }
}