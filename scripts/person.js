export class Person{
    constructor(id,noms,email,sexe,code_pays,pays,password,age,photo){
        this.id=id;
        this.noms=noms;
        this.email=email;
        this.sexe=sexe;
        this.code_pays=code_pays;
        this.pays=pays;
        this.pays=password;
        this.age=age;
        this.photo=photo;
    }
}

export class sender extends Person{
    constructor(totalAmount){
        super(id,noms,email,sexe,code_pays,pays,password,age,photo);
        this.totalAmount=totalAmount;
    }
    send(receiver,amount){
        lancerSimulation(amount);
    }
}
export class receiver extends Person{
    constructor(recivedAmout){
        super(id,noms,email,sexe,code_pays,pays,password,age,photo);
        this.recivedAmout=recivedAmout;
    }
}