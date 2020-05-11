// Storage Controller

const StorageCtrl = (function(){

  return {
    storeItem: function(item) {

      let items;

      // Check if any items in ls

      if(localStorage.getItem('items') === null) {
        items = [];
        // Push new Item
        items.push(item)

        // Set ls

        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // Get what is already in ls
        items = JSON.parse(localStorage.getItem('items'));

        // push new item

        items.push(item);

        // Reset ls

        localStorage.setItem('items', JSON.stringify(items));


      }
      localStorage.getItem('items')
    },

    getUsersFromStorage: function() {

      let items;

      if(localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'))
      }

      return items;
    },

    updateUserStorage: function (updatedUser) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, index) => {
        if(updatedUser.id === item.id) {
          items.splice(index, 1, updatedUser);
        }
      });

      localStorage.setItem('items', JSON.stringify(items));

    },

    deleteUserFromStorage: function(id) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, index) => {
        if(id === item.id) {
          items.splice(index, 1);
        }
      });

      localStorage.setItem('items', JSON.stringify(items));
    }
  }
})();


// Item Controller
const ItemCtrl = (function(){
  // Item constructor
  const Item = function(id, name, address, city, minbet, maxbet, maxpayout, applycredit) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.city = city;
    this.minbet = minbet;
    this.maxbet = maxbet; 
    this.maxpayout = maxpayout;
    this.applycredit = applycredit;
  }

  // Data Structure / State
  const data = {
    // items: [
    // //   {id:0,
    // //   name: 'Kennyshop1',
    // //   address: '12 Owoseni Street oshodi',
    // //   city: 'Ibadan',
    // //   minbet: 50,
    // //   maxbet: 5000,
    // //   maxpayout: 200000,
    // //   applycredit: true
    // // },
    // // {id:1,
    // //   name: 'Idumota',
    // //   address: '16 Mosaku Street Obanikoro',
    // //   city: 'lagos',
    // //   minbet: 50,
    // //   maxbet: 5000,
    // //   maxpayout: 200000,
    // //   applycredit: true
    // // },
    // // {id:2,
    // //   name: 'Ilare',
    // //   address: '11 Godwin omonua Street Okota',
    // //   city: 'Akure',
    // //   minbet: 50,
    // //   maxbet: 5000,
    // //   maxpayout: 200000,
    // //   applycredit: true
    // // }
    // ],
    items: StorageCtrl.getUsersFromStorage(),
    currentItem: null
  }

  return {
    getItems: function() {

      return data.items
    },

    addItem: function(name, address, minbet, city, maxbet , maxpayout, applycredit) {
      let ID;
      // Create Id
      if(data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 1
      }

      // Maxbet, minbet, maxpayout to numbers
      maxbet = parseInt(maxbet);
      minbet = parseInt(minbet);
      maxpayout = parseInt(maxpayout);

      newItem = new Item(ID, name, address, city, maxbet, minbet, maxpayout, applycredit);

      // Add to items Array
      data.items.push(newItem);

      return newItem;
    },
    getUserById: function (id) {
      let found = null;

      data.items.forEach(function(item) {
        if(item.id === id) {
          found = item;
        }
      });

      return found;
    },
    updateUser: function (name, address, maxbet, city, minbet, maxpayout, applycredit) {

      maxbet = parseInt(maxbet);
      minbet = parseInt(minbet);
      maxpayout = parseInt(maxpayout);

      let found = null;

      data.items.forEach(item => {
        if(item.id === data.currentItem.id) {
          item.name = name;
          item.address = address;
          item.maxbet = maxbet;
          item.city = city;
          item.minbet = minbet;
          item.maxpayout = maxpayout;
          item.applycredit = applycredit;
          found = item;
        }
      });

      return found;
    },
    deleteUser: function (id) {

    
      
    
        // Get the ids
        ids = data.items.map(item => {
          return item.id
        });
  
        // Get the index
        const index = ids.indexOf(id);
  
        // Remove item
        data.items.splice(index, 1);
      
    },
     
    setCurrentUser: function (item) {
      data.currentItem = item;
    },

    getCurrentUser: function () {
      return data.currentItem;
    },

  

    logData: function () {
      return data;
    }
  }
})();



// UI Controller
const UICtrl = (function(){

const UIselectors = {
  itemList: '.tbody',
  addBtn: '.add-btn',
  closeBtn: '.close-btn',
  deleteBtn: '.delete-btn',
  yesBtn: '.yes',
  noBtn: '.no',
  updateBtn: '.update-btn',
  card: '.card-edit',
  itemName: '#name',
  listUsers: '#users tr',
  itemAddress: '#address',
  itemCity: '#city',
  itemMinbet: '#minBet',
  itemMaxBet: '#maxBet',
  itemMaxPayout: '#maxPayout',
  itemApplyCredit: '#applyCredit',


}

  // public Methods
  return {
    populateItemList: function(items) {
      let html = '';

      items.forEach(item => {
        html += `
        <tbody>
        <tr>
          <td scope="row" id="item-${item.id}">${item.id}</td>
          <td>${item.name}</td>
          <td>${item.address}</td>
          <td>${item.maxpayout}</td>
          <td>${item.applycredit}</td>
          <td>
            <input type="image" src="http://elb.elbet.rs/Images/editButtonSmall.gif" alt="edit" id="${item.id}" text="edit" class="edit-item">
          </td>
        </tr>
      </tbody>
        `
      });

      // 
      document.querySelector('.tbody').innerHTML = html;

    },
    getItemInput: function () {
      return {
        name: document.querySelector(UIselectors.itemName).value,
        address: document.querySelector(UIselectors.itemAddress).value,
        city: document.querySelector(UIselectors.itemCity).value,
        minbet: document.querySelector(UIselectors.itemMinbet).value,
        maxbet: document.querySelector(UIselectors.itemMaxBet).value,
        maxpayout: document.querySelector(UIselectors.itemMaxPayout).value,
        applycredit: document.querySelector(UIselectors.itemApplyCredit).checked
      }
    },
    addListItem: function(item) {
      // Create th elelment
      const tr = document.createElement('tr');
      // Set Attribute
      // th.setAttribute('scope', 'row');
      // Add ID
      tr.id = `item-${item.id}` ;

      tr.innerHTML = `
      <td scope="row" id="item-${item.id}">${item.id}</td>
      <td>${item.name}</td>
      <td>${item.address}</td>
      <td>${item.maxpayout}</td>
      <td>${item.applycredit}</td>
      <td>
        <input type="image" src="http://elb.elbet.rs/Images/editButtonSmall.gif" alt="edit" id="${item.id}" text="edit" class="edit-item">
      </td>
      `;

      // Insert item
      document.querySelector(UIselectors.itemList).insertAdjacentElement('beforeend', tr);
    },
    // Clear Input field
    clearInput: function() {
      document.querySelector(UIselectors.itemName).value = '';
      document.querySelector(UIselectors.itemAddress).value = '';
      document.querySelector(UIselectors.itemCity).value = '';
      document.querySelector(UIselectors.itemApplyCredit).checked = '';
      document.querySelector(UIselectors.itemName).focus();

      
    },
    // FIll form to edit
    addItemToForm: function() {
      document.querySelector(UIselectors.itemName).value =  ItemCtrl.getCurrentUser().name;
      document.querySelector(UIselectors.itemAddress).value = ItemCtrl.getCurrentUser().address;
      document.querySelector(UIselectors.itemCity).value = ItemCtrl.getCurrentUser().city;
      document.querySelector(UIselectors.itemMaxBet).value = ItemCtrl.getCurrentUser().maxbet;
      document.querySelector(UIselectors.itemMinbet).value = ItemCtrl.getCurrentUser().minbet;
      document.querySelector(UIselectors.itemMaxPayout).value = ItemCtrl.getCurrentUser().maxpayout;
      document.querySelector(UIselectors.itemApplyCredit).checked = ItemCtrl.getCurrentUser().applycredit;
      document.querySelector(UIselectors.itemName).focus();
      UICtrl.showEditState()

    },

    showEditState: function (e) {
      const updateBtn = document.querySelector('.update-btn');
      const addBtn = document.querySelector(UIselectors.addBtn);
      const deleteBtn = document.querySelector(UIselectors.deleteBtn);
      const close = document.querySelector('.s-close')
      close.style.display = 'inline';
      updateBtn.style.display = 'block';
      deleteBtn.style.display = 'block';
      addBtn.style.display = 'none'; 
  
    },

    updatedUserItem: function(item) {
      let userItems = document.querySelectorAll(UIselectors.listUsers);


      // Turn nodelist into array
      
      userItems =  Array.from(userItems);

      userItems.forEach(userItem => {
        const itemID = userItem.childNodes[1].getAttribute('id');

        
        if(itemID === `item-${item.id}`) {

          document.querySelector(`#${itemID}`).parentNode.innerHTML = `
            
            <td scope="row" id="item-${item.id}">${item.id}</td>
            <td>${item.name}</td>
            <td>${item.address}</td>
            <td>${item.maxpayout}</td>
            <td>${item.applycredit}</td>
            <td>
              <input type="image" src="http://elb.elbet.rs/Images/editButtonSmall.gif" alt="edit" id="${item.id}" text="edit" class="edit-item">
            </td>
          `
        }
      })

      UICtrl.clearEditState();
    },

    deleteUserItem: function(id) {
      
      
      document.querySelector('.yes').addEventListener('click', (e) => {
        if(e.target.classList.contains('yes')) {

          const itemID = `#item-${id}`;
        
        const item = document.querySelector(itemID).parentNode;
        item.remove();
        UICtrl.clearEditState(); 


        }
        e.preventDefault();
      })
      // if(confirm('Are you sure you want to delete this user?')) {
      //   const itemID = `#item-${id}`;
        
      //   const item = document.querySelector(itemID);
      //   item.remove();
      //   UICtrl.clearEditState();
      //   console.log("removed")
      // } else {
      //   UICtrl.showEditState();
      // }
      
    },

    
    clearEditState: function() {
      const updateBtn = document.querySelector('.update-btn');
      const addBtn = document.querySelector(UIselectors.addBtn);
      const deleteBtn = document.querySelector(UIselectors.deleteBtn);
      const close = document.querySelector('.s-close')
      close.style.display = 'none';
      updateBtn.style.display = 'none';
      deleteBtn.style.display = 'none';
      addBtn.style.display = 'block'; 
      UICtrl.clearInput();
    },
    
    getSelectors: function () {
      return UIselectors;
    }
  }
})();



// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
  // Load Event Listeners 
  const loadEventListeners = function() {
    // Get UI selectors
    const UIselectors = UICtrl.getSelectors();

    // Add Item event 
    document.querySelector(UIselectors.addBtn).addEventListener('click', itemAddUser);

    // Validate Max
    document.querySelector(UIselectors.itemMaxBet).addEventListener('blur', validateMax);

    // Validate Min
    document.querySelector(UIselectors.itemMinbet).addEventListener('blur', validateMin);

    // Validate MaxPayout
    document.querySelector(UIselectors.itemMaxPayout).addEventListener('blur', validatePay);

    document.querySelector(UIselectors.itemName).addEventListener('submit', validateName);

    // Listen for Edit State
    document.querySelector('#users').addEventListener('click', enableEdit);
    
    // Listen to the Update state    
    document.querySelector(UIselectors.updateBtn).addEventListener('click', updateEditUser);

    // Listen to the close button    
    document.querySelector(UIselectors.closeBtn).addEventListener('click', UICtrl.clearEditState);

    // Listen to the delete button    
    document.querySelector(UIselectors.deleteBtn).addEventListener('click', userDeleteSubmit);
  
  ;
  }

  // Add item user

  const validateMax = function () {
    const input = UICtrl.getItemInput();
    if(input.maxbet > 5000) {
      document.querySelector('#maxBet').classList.add('is-invalid');
    } else {
      document.querySelector('#maxBet').classList.remove('is-invalid');
    }

   
  }

  const validateMin = function () {
    const input = UICtrl.getItemInput();
    if(input.minbet < 50 || input.minbet > 5000) {
      document.querySelector('#minBet').classList.add('is-invalid')
    } else {
      document.querySelector('#minBet').classList.remove('is-invalid');
    } 
  }



  const validatePay = function () {
    const input = UICtrl.getItemInput();
    if(input.maxpayout > 1000000) {
      document.querySelector('#maxPayout').classList.add('is-invalid')
    } else {
      document.querySelector('#maxPayout').classList.remove('is-invalid');
    } 
  }

  const validateName = function () {
    const input = UICtrl.getItemInput();
    if(input.name === '') {
      document.querySelector('#name').classList.add('is-invalid')
    } else {
      document.querySelector('#name').classList.remove('is-invalid') 
    }
  }

  const itemAddUser = function (e) {
    // Get form Input from UI controller

    const input = UICtrl.getItemInput();
    

    if(input.name !== '') {
      // Add Item
      const newItem = ItemCtrl.addItem(input.name, input.address, input.maxbet, input.city, input.minbet, input.maxpayout, input.applycredit);

      UICtrl.addListItem(newItem);

      // Store in ls
      StorageCtrl.storeItem(newItem);
      // Clear Fields after submitting
      UICtrl.clearInput();

    } else {
      validateName();

    }
    // console.log(input);
    e.preventDefault();
  }

  const enableEdit = function (e) {
    if(e.target.classList.contains('edit-item')) {
      // Get User-ID
      const listId = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.id;


      // User-Id split
      listIdArr = listId.split('-');

      // const userToEdit = ItemCtrl.getUserById(id);
      const id = parseInt(listIdArr[1]);

      // Get users to Edit
      const userToEdit = ItemCtrl.getUserById(id);



      // Set current user
      
      ItemCtrl.setCurrentUser(userToEdit);

      // Add user to form
      UICtrl.addItemToForm()
      
    }
    e.preventDefault()
  }
  
  const updateEditUser = function (e) {
    // Get User input
    const input = UICtrl.getItemInput();

    // Update user
    const updatedUser = ItemCtrl.updateUser(input.name, input.address, input.maxbet, input.city, input.minbet, input.maxpayout, input.applycredit);

    UICtrl.updatedUserItem(updatedUser);

    // Update ls
    StorageCtrl.updateUserStorage(updatedUser);

    e.preventDefault();
  }

  const userDeleteSubmit = function (e) {

    // Get current item
    const currentItem = ItemCtrl.getCurrentUser();

    // Delete from data structure
    ItemCtrl.deleteUser(currentItem.id);

    // Delete from UI
    UICtrl.deleteUserItem(currentItem.id); 

    // Delete from local storage
    StorageCtrl.deleteUserFromStorage(currentItem.id);

    // UICtrl.clearEditState();
    e.preventDefault();
  }
  
  // Public methods
  return {
    init: function() {
      // Fetch Items from data structure
    const items = ItemCtrl.getItems();

    // polulate list with items
    UICtrl.populateItemList(items);
    let time = new Date();
    let output =`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    console.log(output);
    ;
    // Load event listeners
    loadEventListeners();
    }
  }
})(ItemCtrl,StorageCtrl,UICtrl);

 
App.init();