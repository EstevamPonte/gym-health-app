import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Exclude } from "class-transformer";
import { Code } from "./Code"

@Entity('user')
class User {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Exclude()
  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column()
  code_reference: string

  @JoinColumn({name: "code_reference"})
  @OneToOne(() => Code, {
      onDelete: "CASCADE"
  })
  codeReference: Code

  constructor() {
    if(!this.id) {
      this.id = uuid()
    }
  }
}

export {User}