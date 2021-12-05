import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { useMutation } from 'glimmer-apollo';
import { SIGN_IN } from 'app/gql/mutations/sign-in';

export default class LoginFormComponent extends Component {
  @tracked email;
  @tracked password;
  @tracked errorMessage;

  signIn = useMutation(this, () => [
    SIGN_IN,
    {
      onComplete: (data) => {
        console.log('Received token:', data);
      },
      onError: (error) => {
        console.error('Error:', error.message);
        this.errorMessage = error.message;
      },
    },
  ]);

  @action
  async authenticate(event) {
    event.preventDefault();
    let variables = { email: this.email, password: this.password };
    await this.signIn.mutate({ input: { variables } });
    }
  }
}
