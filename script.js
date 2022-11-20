let init = () => {

     let cards = document.querySelectorAll('.dropzone .card');
     let dropzones = document.querySelectorAll('.dropzone');

     loadEvents();

     function loadEvents() {

          cards.forEach(item => {
               item.style.cssText = 'pointer-events: auto';
               item.addEventListener('dragstart', handlerDragStart);
               item.addEventListener('drag', handlerDrag);
               item.addEventListener('dragend', handlerDragEnd);
          });


          dropzones.forEach(zones => {
               zones.style.cssText = 'pointer-events: auto';
               zones.addEventListener('dragenter', handlerDragEnter);
               zones.addEventListener('dragover', handlerDragOver);
               zones.addEventListener('dragleave', handlerDragLeave);
               zones.addEventListener('drop', handlerDragDrop);
          })
     }



     // events item
     function handlerDragStart() {
          dropzones.forEach(dropzone => dropzone.classList.add('highlight'))
          this.classList.add('card-move');

          showTrash(true);
     }

     function handlerDrag() {
          this.classList.add('card-move');
     }

     function handlerDragEnd() {
          dropzones.forEach(dropzone => dropzone.classList.remove('highlight'))
          this.classList.remove('card-move');

          showTrash(false);

          let deleteItems = document.querySelector('.dropzone-removed .card');

          deleteItems ? deleteItems.remove() : null

     }


     function showTrash(status) {
          let contentTrash = document.querySelector('.content-board-removed');

          contentTrash.style.cssText = status ?
               'opacity: 1; transition: .3s ease-in-out' :
               'opacity: 0; transition: .3s ease-in-out'

     }



     // events zone
     function handlerDragEnter() {
          this.classList.add('card-enter');
     }

     function handlerDragOver() {
          this.classList.add('zone-over');

          let cardDragged = document.querySelector('.card-move');
          this.appendChild(cardDragged);
     }

     function handlerDragLeave() {
          this.classList.remove('zone-over');
     }

     function handlerDragDrop() {
          let cardDropped = document.querySelector('.card-enter');
          this.removeChild(cardDropped);

     }



     //delete card action
     let buttonsRemove = document.querySelectorAll('.b-remove-item')

     buttonsRemove.forEach(button => {
          button.addEventListener('click', removeCard)
     })





     function removeCard() {
          let card = this.parentElement.parentElement;

          card.style.cssText = 'transition: .3s ease-out; transform: scale(.1) rotateZ(90deg); opacity: .0;  ';
          setTimeout(() => {
               card.remove();
          }, 300)

          let message = document.querySelector('.message-card');

          message.style.cssText = 'opacity: 1; transition: .3s ease-in-out; background-color: #42b700';
          message.textContent = 'Cartão deletado com sucesso';

          setTimeout(() => {
               message.style.cssText = 'opacity: 0; transition: .3s ease-in-out';
               message.textContent = '';

          }, 2000)

     }

     

}



// let add card action
let buttonAdd = document.querySelector('.add-card')
buttonAdd.addEventListener('click', addCard)

function addCard() {

     let mainBoard = document.querySelector('.boards');
     let newCard = createCardDinamic();

     mainBoard.appendChild(newCard);
     handlerNewItem();

     init()

}

function createButtonDinamic() {

     let contentButtons = document.createElement('div');
     let buttonRemove = document.createElement('button');
     let iconTrash = document.createElement('i');

     contentButtons.classList.add('buttons-action');
     buttonRemove.classList.add(['b-action-item'], ['b-remove-item']);
     iconTrash.classList.add(['fas'], ['fa-trash-alt']);

     contentButtons.appendChild(buttonRemove);
     buttonRemove.appendChild(iconTrash);

     buttonRemove.style.cssText = `flex-direction: row-reverse`;

     buttonRemove.innerHTML = ' Excluir cartão';

     return contentButtons;

}

function createCardDinamic() {
     let newCard = document.createElement('section');
     let titleCard = document.createElement('h3');
     let newDropzone = document.createElement('div');
     let spanAddItem = document.createElement('span');
     let iconSpanAddItem = document.createElement('i');


     newCard.classList.add('board');
     titleCard.textContent = 'Titulo Card';
     newDropzone.classList.add('dropzone');
     spanAddItem.classList.add('add-item-list');
     iconSpanAddItem.classList.add(['fas'], ['fa-plus'], ['icon-add-item']);

     spanAddItem.textContent = 'adicionar item';

     newCard.appendChild(titleCard);
     newCard.appendChild(newDropzone);
     newCard.appendChild(spanAddItem);
     spanAddItem.appendChild(iconSpanAddItem);

     spanAddItem.style.cssText = `flex-direction: row-reverse`;

     let contentButtons = createButtonDinamic();
     newCard.appendChild(contentButtons);

     return newCard;
}


function handlerNewItem() {
     let clickedItem = document.querySelectorAll('.add-item-list');


     clickedItem.forEach( e => {
          
          e.addEventListener('click', createItemDinamic);

     });
          
}


function createItemDinamic() {

     cardClicked  = this.parentElement;
     let dropzonePush = cardClicked.querySelector('.dropzone');

     let newItemCard = document.createElement('div');
     let newContentItem = document.createElement('div');
     let newTextContent = document.createElement('p');

     newItemCard.classList.add('card');
     newContentItem.classList.add('content');
     newTextContent.textContent = 'Meu novo item do card';

     newItemCard.setAttribute('draggable', true);

     dropzonePush.appendChild(newItemCard);
     newItemCard.appendChild(newContentItem);
     newContentItem.appendChild(newTextContent);

     init()
}


init();

handlerNewItem();