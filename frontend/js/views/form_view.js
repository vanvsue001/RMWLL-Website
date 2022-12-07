import View from "./view.js";

export default class FormView extends View {
  constructor(storageService, viewModel, parentView) {
    super(storageService, viewModel["form"]);
    this.entityViewModel = viewModel;
    this.currentItemId = null;
    this.parentView = parentView; //reference to parent list view
    this.formChanged = false; //tracks if form changed
    this.lookupsPopulated = false;
    this.coachesList = [];

  }
  get $formContainer() {
    return $("#" + this.viewModel.containerId);
  }
  /* GETTERS AND SETTERS */
  get fields() {
    return this.viewModel.fields;
  }
  get formId() {
    return this.viewModel.id;
  }
  get $form() {
    return $("#" + this.formId);
  }
  get form() {
    return this.$form.get(0);
  }
  get formValid() {
    return this.form.checkValidity();
  }
  get $inputs() {
    return $("#" + this.formId + " :input");
  }
  get $editModal() {
    return $("#" + this.parentView.editModalContainerId);
  }


  async renderForm() {
    this.data = await this.getViewData();
    
    this.viewData = {
      view: this, //pass in the view itself so you can use view functions if you want
      viewModel: this.viewModel,
      data: this.data,
    };
    await this.renderTemplate(
      this.$formContainer,
      this.templateUrl,
      this.viewData,
    );
    await this.bindItemEvents(this.data);
  }

  async getViewData() {
    if (!this.lookupsPopulated){
      await this.populateLookups();
    }
    if (this.currentItemId)
      return await this.storage.read(this.currentItemId);
    else
      return {}; //return empty object for 'create' action
  }

  async populateLookups() {
    for (let field of this.fields) {
      if ("lookupName" in field) {
        this.coachesList = await this.storage.getLookup(field.lookupName);
      }
    }
    this.lookupsPopulated=true;

  }

  async bindItemEvents(data) {
    await this.change(data);
    await this.submit(data);
    await this.cancel(data);
  }
  async bindWrapperEvents() {}
  submit = (data) => {
    let form = document.getElementById("team-form");
    const that = this;
    form.addEventListener("submit", async function (ev) {

      ev.preventDefault(); 
      let id = $("#id").val();
      id = parseInt(id);
      that.currentItemId = id;
      let name = $("#name").val();
      let coach_id = $("#coachName option:selected").val();
      coach_id = parseInt(coach_id);
      let notes = $("#notes").val();
      let motto = $("#motto").val();

      if (name && coachName && notes && motto) {
        this.formValidated;
        
        if (!id) {
          id = that.storage.size + 1;
          await that.addListItem({ name, coach_id, league_id: 1, notes, motto});
          that.parentView.$editModal.modal("hide");
   
        } 
        else {
   
          await that.updateListItem(id, {id, name, coach_id, league_id: 1, notes, motto});
          that.parentView.$editModal.modal("hide");
        }
      } 
      else {
        alert("Form is not valid");
      }
      that.parentView.render();
    });

    $(document).on("submit", "#submitButton", async (e) => {
      e.preventDefault();
    });
  };

  /*getFormData()-get the data from the form an package as a normal object for submit*/
  getFormData() {
    return Object.fromEntries(new FormData(this.form));
  }

  change = async (data) => {
    let inputs = document.querySelectorAll("input");
    const that = this;
    for (let i = 1; i < inputs.length; ++i) {
      inputs[i].addEventListener("change", async (ev) => {
        let el = ev.currentTarget;
        await that.validateItem(el);
      });
    }
  };

  cancel = async (data) => {
    const that = this;
    $(document).on("click", "#cancelButton", async (e) => {
      let name = $("#name").val();
      let coachName = $("#coachName").val();
      let coachPhone = $("#coachPhone").val();
      let coachEmail = $("#coachEmail").val();

      if (data.name == name && data.coachName == coachName && data.notes == notes && data.motto == motto) {
        that.parentView.$editModal.modal("hide");
      } 
      else {
        var answer = window.confirm("Form has been change, wanna to continue?");
        if (answer) {
        } 
        else { 
          that.paformValidatedrentView.$editModal.modal("hide");
        }
      }
    });
  };

  getEventEl(ev) {
    return $(ev.currentTarget);
  }

  fieldValidated($el) {
    this.$form.removeClass("was-validated")
  }

  formValidated(el) {
    this.$form.addClass("was-validated")
  }

  async updateListItem(id, obj) {
    await this.storage.update(id, obj);
  }

  async addListItem(obj) {
    await this.storage.create(obj);

  }

  validateItem = async (el) => {
    if (el.value === "") {

      el.classList.add("is-invalid");
      let form = document.getElementById("team-form");
      form.removeClass("");
      return false;
    } 
    else {
      el.classList.remove("is-invalid");
      return true;
    }
  };
}
