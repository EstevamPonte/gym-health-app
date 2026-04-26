import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("session")
class Session {
  @PrimaryColumn()
  readonly id: string;

  @Column({ nullable: false, unique: true })
  token: string;

  @Column()
  user_reference: number;

  @JoinColumn({ name: "user_reference" })
  @ManyToOne(() => User, {
    onDelete: "CASCADE",
  })
  userReference: User;

  @CreateDateColumn({ nullable: false })
  expires_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Session };
