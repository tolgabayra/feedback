'use client';
import { Divider } from '@mantine/core';
import React from 'react';

type Props = {};

export default function Settings({}: Props) {
  return (
    <div>
      <div className="max-w-sm mx-auto px-4 sm:px-6">
        <div className="pt-4 pb-6 md:pt-2 md:pb-3">
          <div className="max-w-sm">
            <h3 className="text-xl text-center"> Parolanızı Değiştirin</h3>
            <Divider className="mb-3" />
            <form>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="password2"
                  >
                    Eski Parola
                  </label>
                  <input
                    id="passsword2"
                    type="password"
                    className="form-input w-full text-gray-800"
                    placeholder="*******"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Yeni Parola
                    </label>
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="form-input w-full text-gray-800"
                    placeholder="********"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                    Değiştir
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
