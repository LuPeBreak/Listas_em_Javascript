
/*
 * Lista Duplamente Encadeada
 */
function ListeaDuplamenteEnc(value) {
    //classe elemento
    function Element(val) {
        this.chave = val;
        this.prox = null;
        this.ante = null;
    }
    
    //cria o primeiro elemento da lista e o armazena para referencias
    this.first = new Element(value);
    
    //funçao para adicionar elemento a lista
    this.add = function (valor) {
        //verifica se o primeiro nao é nulo 
        //pois se for a lista é vazia e se torna necessaria sua criaçao
        if (this.first != null) {
            var pointer = this.first;
            //faz enquanto o ponteiro nao aponta para nulo;
            do {
                /*
                * verifica se o proximo é nullo
                * se for, esse é o ultimo elemento 
                * entao é possivel criar um elemento nesse proximo
                */
                if (pointer.prox == null) {
                    pointer.prox = new Element(valor);
                    pointer.prox.ante = pointer;
                    return "valor " + valor + " adicionado";
                    break;
                } else {
                    pointer = pointer.prox;
                }
            } while (pointer != null);
        } else {
            this.first = new Element(valor);
            return "valor " + valor + " adicionado";
        }
    };
    
    //funçao para busca de elementos na lista
    this.busca = function (valor) {
        var pointer = this.first;
        //faz enquanto o ponteiro nao aponta para nulo;
        do {
            //verifica se o a chave do ponteiro nao é o valor,
            // se for sai do loop
            if (pointer.chave != valor) {
                pointer = pointer.prox;
            } else {
                break;
            }
        } while (pointer != null);
        return pointer;
    };
    
    //funçao para remoçao de elementos da lista
    this.remove = function (valor) {
        var busca = this.busca(valor);
        //verifica se a busca nao encontrou elemento e retornou nulo
        if (busca == null) {
            return "Impossivel remoçao, valor inexistente";
        } 
        // verifica se é o primeiro elemento da lista
        else if (busca == this.first) {
            if (busca.prox != null) {
                var proximo = busca.prox;
                busca.chave = proximo.chave;

                /*
                * verifica se o proximo do proximo nao é nulo, 
                * pois se nao for nulo 
                * ele precisa apontar para o primeiro elemento
                * mas se for dara erro ao tentar utilizar essa chamada:
                * proximo.prox.ante = busca;
                */
                if (proximo.prox != null) {
                    proximo.prox.ante = busca;
                }
                busca.prox = proximo.prox;
                proximo=null;
                return "remoçao realizada com sucesso inicio";
            } else {
                this.first=null;
                return "remoçao realizada com sucesso, a lista se tornou vazia";
            }
        } 
        
        //verifica se o proximo é nulo, pois se for esse é o ultimo elemento
        else if (busca.prox == null)
        {
            busca.ante.prox = null;
            busca = null;
            return "remoçao realizada com sucesso fim";
        } 
        
        // se nao for o primeiro nem o ultimo ele é um elemento intermediario
        else {
            busca.prox.ante = busca.ante;
            busca.ante.prox = busca.prox;
            busca=null;
            return "remoçao realizada com sucesso meio";
        }
    };

}
;

/*
 * Lista Encadeada
 */
function ListeaEnc(value) {
    
    //classe elemento
    function Element(val) {
        this.chave = val;
        this.prox = null;
    }
    
     /*
     * classe busca elemento 
     * necessaria para saber o elemento anterior 
     * possibilitando exclusao de elementos no meio e no fim
     */
    function buscaElemento(elemento, elementoAnte) {
        this.element = elemento;
        this.elementAnte = elementoAnte;
    }
    
    //cria o primeiro elemento da lista e o armazena para referencias
    this.first = new Element(value);
    
    //funçao para adicionar elementos a lista
    this.add = function (valor) {
        //checa se o primeiro elemento é diferente de nulo ( se a lista nao é vazia)
        if (this.first != null) {
            var pointer = this.first;
            
            //faz enquanto o ponteiro nao aponta para nulo;
            do {
                
                /*
                * verifica se o proximo é nullo
                * se for, esse é o ultimo elemento 
                * entao é possivel criar um elemento nesse proximo
                */
                if (pointer.prox == null) {
                    pointer.prox = new Element(valor);
                    return "valor " + valor + " adicionado";
                } else {
                    pointer = pointer.prox;
                }
            } while (pointer != null);
        } else {
            this.first = new Element(valor);
            return "valor " + valor + " adicionado";
        }
    };

    //funçao para buscar elementos na lista
    this.busca = function (valor) {
        var pointer = this.first;
        var pointerAnte = null;
        
        //faz enquanto o ponteiro nao aponta para nulo;
        do {
            
            /*
            * se a chave do ponteiro nao for a procurada 
            * ele muda o ponteiro para o proximo
            * caso seja ele sai do loop
            */
            if (pointer.chave != valor) {
                pointerAnte = pointer;
                pointer = pointer.prox;
            } else {
                break;
            }
        } while (pointer != null);
        var busca = new buscaElemento(pointer, pointerAnte);
        
        //retorna um objeto busca com o ponteiro em que parou e seu anterior
        return busca;
    };

    //funçao para remover elementos da lista
    this.remove = function (valor) {
        var busca = this.busca(valor);
        /*
        * verfica se o elento encontrado é nulo 
        * ou seja varreu toda a lista e nao encontrou
        */
        if (busca.element == null) {
            return "Impossivel remoçao, valor inexistente";
        } 
        //verifica se o elemento encontrado é o primeiro
        else if (busca.element == this.first) {
            /*
             * verifica proximo elemento é diferente de nulo 
             * se fosse nulo seria o primeiro e o ultimo tambem 
             * entao remove-lo seria tornar a lista vazia
             */
            if (busca.element.prox != null) {
                var proximo = busca.element.prox;
                busca.element.chave = proximo.chave;
                busca.element.prox = proximo.prox;
                proximo=null;
                return "remoçao realizada com sucesso inicio";
            } else {
                this.first = null;
                return "remoçao realizada com sucesso, a lista se tornou vazia";
            }
        } 
        //verifica se o proximo elemento é nulo, se for ele é o ultimo
        else if (busca.element.prox == null)
        {
            busca.elementAnte.prox = null;
            busca.element=null;
            return "remoçao realizada com sucesso fim";
        } else {
            busca.elementAnte.prox = busca.element.prox;
            busca.element=null;
            return "remoçao realizada com sucesso meio";
        }
    };
}
;


/*
 * Lista de Referencia Circular
 */
function ListaCircular(value) {

    //classe elemento
    function Element(val) {
        this.chave = val;
        this.prox = null;
    }
    
    /*
     * classe busca elemento 
     * necessaria para saber o elemento anterior 
     * possibilitando exclusao de elementos no meio e no fim
     * necessario elemento find para caso do ultimo elemento ser o procurado
     */
    function buscaElemento(elemento, elementoAnte, encontrou) {
        this.element = elemento;
        this.elementAnte = elementoAnte;
        this.find = encontrou;
    }


    //cria o primeiro elemento da lista e o armazena para referencias
    this.first = new Element(value);
    
    //numero de elementos na lista
    var numElementos = 1;

    this.getNumElementos = function () {
        return numElementos;
    };
    
    //funçao para adicionar elementos a lista
    this.add = function (valor) {
        
        //checa se existem elementos na lista
        if (numElementos >= 1) {
            //cria um variavel ponteiro iniciando no primeiro elemento
            var pointer = this.first;
            //varre a lista ate o ultimo elemento
            for (x = 0; x < numElementos - 1; x++) {
                pointer = pointer.prox;
            }
            pointer.prox = new Element(valor);
            pointer.prox.prox=this.first;
            numElementos++;
            return "valor " + valor + " adicionado";
        } else {
            this.first = new Element(valor, this.first);
            numElementos = 1;
            return "valor " + valor + " adicionado";
        }
    };
    
    //funçao para busca de elementos na lista
    this.busca = function (valor) {
        var pointer = this.first;
        var pointerAnte = null;
        var busca;
        
        // for para varrer a lista ate o ultimo elemento
        for (x = 0; x < numElementos; x++) {
            
            // checa se o valor é diferente do que se procura
            if (pointer.chave != valor) {
                pointerAnte = pointer;
                pointer = pointer.prox;
                busca = new buscaElemento(pointer, pointerAnte, false);
            } else {
                busca = new buscaElemento(pointer, pointerAnte, true);
                break;
            }
        }
        
       return busca;

    };
    
    // funçao para remover elementos da lista
    this.remove = function (valor) {
        var busca = this.busca(valor);
        
        //checa se a busca retornou falso ( nao encontrou o elemento )
        if (busca.find == false) {
            return "Impossivel remoçao, valor inexistente";
        }
        
        //checa se o elemento é o primeiro
        else if (busca.element == this.first) {
            
            //checa se o proximo elemento nao é o primeiro ( se fosse ele seria o unico elemento da lista )
            if (busca.element.prox != this.first) {
                numElementos--;
                var proximo = busca.element.prox;
                busca.element.chave = proximo.chave;
                busca.element.prox = proximo.prox;
                
                return "remoçao realizada com sucesso inicio";

            } else {
                this.first = null;
                numElementos = 0;
                return "remoçao realizada com sucesso, a lista se tornou vazia";
            }
        } 
        
        //checa se o proximo elemento é o primeiro ( se for ele é o ultimo elemento da lista)
        else if (busca.element.prox == this.first)
        {
            busca.elementAnte.prox = this.first;
            numElementos--;
            busca.element=null;
            return "remoçao realizada com sucesso fim";

        } else {
            
            //se nao é nem o primeiro ou o ultimo ele é um elemento do meio
            numElementos--;
            busca.elementAnte.prox = busca.element.prox;
            busca.element=null;
            return "remoçao realizada com sucesso meio";

        }
    };
}
;





