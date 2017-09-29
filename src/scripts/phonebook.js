
var PhoneBook = function (contacts) {
    if (!contacts || contacts.length === 0) {
        this.throwError('You cannot initialize an empty phonebook');
    }
    this.contacts = contacts;
    this.currentCapacity = this.contacts.length;
    this.maxLength = 6;

    // sort alphabitically
    this.sort(this.contacts);

    var filteredContacts = [];

}

PhoneBook.prototype = {
    add: function (contactInfo) {
        if (contactInfo) {
            if (this.isFull()) {
                this.validateContact(contactInfo);
                this.contacts.push(contactInfo);
                this.updateState();
            } else {
                this.throwError('Max Number of contacts reached, Sorry you cannot add more contacts');
            }
        }
        else {
            this.throwError('empty parameter!', contactInfo);
        }
    },
    remove: function (index) {
        if (index) {
            this.contacts.splice(index, 1)
            this.updateState();
        }
    },
    search: function (query) {
        if (query === '') {
            return this.contacts;
        } else {
            this.filteredContacts = this.contacts.filter(function (contact) {
                console.log('contact.name: ', contact.name);
                return contact.name === query || contact.phone === query;
            });
            // this.sort(this.filteredContacts);
            console.table(this.filteredContacts);
            return this.filteredContacts;
        }
    },
    list: function (contactsPerPage, page) {
        if (!contactsPerPage && !page) {
            console.table(this.contacts);
            return this.contacts;
        } else {
            var result = this.paginate(this.contacts, contactsPerPage, page);
            console.table(result);
            return result;
        }
    },
    sort: function (data) {
        if (data) {
            data = data.sort(function (a, b) {
                return a.name.toLowerCase() > b.name.toLowerCase();
            });
        } else {
            return this.throwError('empty parameter!', data);
        }
    },
    isFull: function () {
        if (this.currentCapacity < this.maxLength) {
            return true;
        } else {
            return false;
        }
    },
    updateState: function () {
        this.currentCapacity = this.contacts.length;
        this.sort(this.contacts);
        console.log('State updated:')
        console.table(this.contacts);
    },
    validateContact: function (contactInfo) {
        if (contactInfo) {
            // validate name length: should not exceed 100 chars
            if (contactInfo.name.length > 99) {
                this.throwError('Name cannot be more than 100 characters');
            }

            // validate phone number
            var phonePattern = /^\d{2}-\d{3}-\d{4}$/;
            var phoneResult = phonePattern.test(contactInfo.phone);
            if (!phoneResult) {
                this.throwError('Invalid Phone Number! Please enter a correct number (ex: 22-333-4444)');
            }

            // validate email number
            var emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            var emailResult = emailPattern.test(contactInfo.email);
            if (!emailResult) {
                this.throwError('Invalid email format! Please add a correct email (ex: john@doe.com)');
            }
        }
    },
    paginate: function (array, itemsPerPage, page) {
        --page; // pages should start with 1, but arrays in javascript starts with 0
        return array.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
    },
    throwError: function (message) {
        throw new Error(message);
    }
};