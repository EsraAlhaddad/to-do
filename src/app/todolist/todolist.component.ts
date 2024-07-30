import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Task  {
  taskName: string,
  isCompleted: boolean,
  isEditing: boolean
}

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {
  taskArray: Array<Task> = [];
  taskName: any;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form);

    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
      isEditing: false
    });

    form.reset();
  }

  onEdit(index: number) {
    const task = this.taskArray[index];
    task.isEditing = !task.isEditing;

    if (task.isEditing) {
      this.taskName = task.taskName; //  görev adını yedekle
    } else {
      if (task.taskName.trim() === '') {
        task.taskName = this.taskName; // Eğer görev adı boşsa, orijinal görev adını geri yükle
      }
      delete this.taskName; // Düzenleme modundan çıkıldığında yedekleme değerini kaldır
    }
  }

  onSave(index: number) {
    const task = this.taskArray[index];
    task.isEditing = false;
    if (task.taskName.trim() === '') {
      // Eğer görev adı boşsa, orijinal görev adını geri yükle ve işlemi burada sonlandır
      task.taskName = this.taskName;
      delete this.taskName;
      return;
    }
    delete this.taskName; // Düzenleme modundan çıkıldığında yedekleme değerini kaldır
  }

  onDelete(index: number) {
    console.log(this.taskArray);

    this.taskArray.splice(index, 1); // splice metodu dizideki elemanın indexini kullanarak siliyor
  }

  onCheck(index: number) {
    console.log(this.taskArray);

    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  }
}
