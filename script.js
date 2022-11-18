let init = () => {

     let cards = document.querySelectorAll('.dropzone .card');
     let dropzones = document.querySelectorAll('.dropzone');


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
          deleteItems.remove();
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
     let buttonsRemove = document.querySelectorAll('.b-remove-card')

     buttonsRemove.forEach(button => {
          button.addEventListener('click', removeCard)
     })



     function removeCard() {
          let card = this.parentElement.parentElement;

          card.style.cssText = 'transition: .8s ease-out; transform: scale(.1) rotateZ(90deg); opacity: .0;  ';
          setTimeout(() => {
               card.remove();
          }, 800)

          let message = document.querySelector('.message-card');

          message.style.cssText = 'opacity: 1; transition: .3s ease-in-out; background-color: #42b700';
          message.textContent = 'Cartão deletado com sucesso';

          setTimeout(() => {
               message.style.cssText = 'opacity: 0; transition: .3s ease-in-out';
               message.textContent = '';

          }, 2000)

     }

}




init()