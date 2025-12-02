import { ApplicationRef, inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { merge } from 'lodash-es';
import { BehaviorSubject, delay, first } from 'rxjs';
import { Media, MediaType } from './media.types';

@Injectable({
  providedIn: 'root'
})
export class MediaDataService {

  private appRef = inject(ApplicationRef);
  private list = new BehaviorSubject<Media[]>([]);

  private createMock(): Media {
    const type = faker.helpers.enumValue(MediaType);
    return {
      id: faker.string.nanoid(),
      filename: type == MediaType.FILE ? faker.system.fileName() : faker.hacker.noun(),
      type,
      sizeBytes: type == MediaType.FILE ? faker.number.int({ min: 100, max: 10_000_000 }) : null,
      belongsInFolderId: null,
      createdAt: faker.date.anytime(),
      lastModifiedAt: faker.date.anytime(),
      thumbnail: type == MediaType.FILE ? faker.helpers.maybe(() => `https://picsum.photos/160/90`) ?? null : null,
    }
  }

  private isInitialized = false;
  private initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    this.list.next(Array(200)
      .fill(0)
      .map(() => {
        return this.createMock()
      })
      .map((media, _, arr) => {
        const folders = arr.filter(m => m.type == MediaType.FOLDER);
        if (folders.length > 0) {
          return {
            ...media,
            belongsInFolderId: faker.helpers.maybe(() => faker.helpers.arrayElement(folders).id, { probability: 0.8 }) ?? null,
          }
        }
        return media
      }))
  }

  getList() {
    this.appRef.isStable.pipe(
      first(stable => stable),
      delay(100),
    ).subscribe(() => {
      this.initialize();
    })
    return this.list;
  }

  save(id: string, data: Media) {
    this.list.next(this.list.value.map(oldValue => oldValue.id == id ? merge(oldValue, data) : oldValue))
  }
}
